# FandomTrivia 多人同玩方案分析

> 基于现有技术栈（React 19 + TypeScript + Supabase + Express.js）

---

## 一、需求定义

"多人同玩"指多个真实用户在同一时刻参与同一场测验，竞争谁答得又快又准。核心体验：

- 实时看到对手的进度
- 同步开始、同步结束
- 最终排名按正确率 + 完成时间决出

---

## 二、技术方案对比

### 方案 A：Supabase Realtime（推荐，成本最低）

**原理：** Supabase 内置 Realtime 模块，基于 PostgreSQL LISTEN/NOTIFY + WebSocket，支持两种用法：
- **Broadcast**：房间内广播消息（不持久化），适合实时进度同步
- **Presence**：追踪在线用户状态（谁在房间里、进度多少）
- **Postgres Changes**：监听数据库变更

**适配现有代码的改动量：**

| 改动点 | 说明 |
|--------|------|
| 新增 Supabase `rooms` 表 | 存房间号、quiz_id、状态、参与者 |
| 新增 Supabase `room_scores` 表 | 实时记录每人当前答题进度 |
| 前端订阅 Presence channel | 显示对手实时进度条 |
| 前端 Broadcast 发送答题事件 | 每次答题广播给房间内所有人 |
| 前端新增房间大厅界面 | 创建 / 加入房间 |

**核心代码示意：**

```typescript
// 创建/加入多人房间
const channel = supabase.channel(`room:${roomId}`, {
  config: { presence: { key: user.id } }
});

// 追踪所有人的实时进度
channel
  .on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState();
    // { userId: [{ progress: 5, score: 4 }], ... }
    setOpponents(state);
  })
  .on('broadcast', { event: 'answer' }, ({ payload }) => {
    // 收到别人的答题事件
    updateOpponentProgress(payload.userId, payload.questionIndex);
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({ progress: 0, score: 0 }); // 上线
    }
  });

// 本人答题时广播
await channel.send({
  type: 'broadcast',
  event: 'answer',
  payload: { userId: user.id, questionIndex: currentQ, correct: isCorrect }
});
```

**优点：**
- 已有 Supabase，零额外费用（Spark 免费计划含 200 并发连接）
- 与现有 Auth / DB 完全融合，用户直接用 Google 账号进多人房间
- 代码量最少，1-2 天可出 MVP

**缺点：**
- Broadcast 消息不持久，页面刷新会丢失进度（需用 Presence 补偿）
- Supabase 免费计划有并发限制，高并发需付费

---

### 方案 B：Socket.io on Express（灵活，自主可控）

**原理：** 在现有 Express 服务器上加 Socket.io，用 WebSocket 实现全双工实时通信。服务器维护房间状态（in-memory 或 Redis），客户端加入房间后实时同步。

**架构：**

```
Client A ──┐
Client B ──┤── Socket.io ── Express Server (Room Manager) ── Redis/Memory
Client C ──┘
```

**核心服务端逻辑：**

```typescript
// server.ts
import { Server } from 'socket.io';

const io = new Server(httpServer, { cors: { origin: '*' } });

// 内存存储房间状态（生产环境换 Redis）
const rooms = new Map<string, RoomState>();

io.on('connection', (socket) => {
  socket.on('join_room', ({ roomId, userId, quizId }) => {
    socket.join(roomId);
    const room = rooms.get(roomId) ?? createRoom(roomId, quizId);
    room.players[userId] = { progress: 0, score: 0 };
    rooms.set(roomId, room);
    io.to(roomId).emit('room_update', room); // 广播最新状态
  });

  socket.on('submit_answer', ({ roomId, userId, questionIndex, correct }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.players[userId].progress = questionIndex + 1;
    if (correct) room.players[userId].score++;
    io.to(roomId).emit('room_update', room); // 全员同步

    // 检查是否全员完成
    const allDone = Object.values(room.players)
      .every(p => p.progress >= room.totalQuestions);
    if (allDone) io.to(roomId).emit('game_over', computeRanking(room));
  });
});
```

**优点：**
- 完全自主控制游戏逻辑（题目分发、同步开始倒计时等）
- Socket.io 生态成熟，断线重连、命名空间等开箱即用
- 可精确控制"所有人看到同一套题目、同时开始"

**缺点：**
- 需要真正的长连接服务器（Vercel 等 Serverless 不支持，需 Railway / Fly.io / VPS）
- 加 Redis 才能多实例水平扩展
- 开发量约 3-5 天

**部署推荐：** Railway（有免费额度，Docker 一键部署）

---

### 方案 C：Liveblocks / PartyKit（托管 Multiplayer 服务）

**原理：** 专门为协同 / 多人互动设计的托管服务，内置 Presence、Broadcast、Storage，提供 React Hooks，接入极快。

#### C1 — Liveblocks

```typescript
// 极简接入示例
import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

const client = createClient({ publicApiKey: 'pk_...' });

const { RoomProvider, useMyPresence, useOthers } = createRoomContext(client);

// 组件内
function QuizRoom() {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers(); // 其他所有人的实时 presence

  const onAnswer = (correct: boolean) => {
    updateMyPresence({ progress: myPresence.progress + 1, score: myPresence.score + (correct ? 1 : 0) });
  };

  return (
    <div>
      {others.map(other => (
        <ProgressBar key={other.connectionId} value={other.presence.progress} />
      ))}
    </div>
  );
}
```

**优点：** 接入最快（半天），免费计划够 MVP，React Hooks 友好
**缺点：** 第三方依赖，数据在 Liveblocks 服务器，免费计划有 MAU 限制

#### C2 — PartyKit

专为"多人实时应用"设计，Worker 直接跑在边缘节点（Cloudflare Workers），延迟极低。

```typescript
// partykit/server.ts
export default class QuizParty implements Party.Server {
  players: Record<string, PlayerState> = {};

  onConnect(conn: Party.Connection) {
    conn.send(JSON.stringify({ type: 'room_state', players: this.players }));
  }

  onMessage(message: string, sender: Party.Connection) {
    const event = JSON.parse(message);
    if (event.type === 'answer') {
      this.players[sender.id].progress++;
      this.broadcast(JSON.stringify({ type: 'room_update', players: this.players }));
    }
  }
}
```

**优点：** 边缘部署，全球低延迟；免费；代码简洁
**缺点：** 需要熟悉 Cloudflare Workers 范式，与现有 Express 不在同一部署

---

### 方案 D：WebRTC P2P（极限轻量）

**原理：** 用 PeerJS 或原生 WebRTC，玩家之间直接建立 P2P 连接，不经过中心服务器传数据。信令服务器（Signaling）只需用 Supabase Realtime 做一次握手。

**适用场景：** 2-4 人小房间，对服务器成本极度敏感

**缺点：**
- NAT 穿透问题，部分网络环境下连不上
- 逻辑复杂（需选 Host 节点同步状态）
- 不适合大房间
- **不推荐作为主方案**

---

## 三、方案对比总结

| 维度 | 方案A Supabase Realtime | 方案B Socket.io | 方案C Liveblocks | 方案C PartyKit |
|------|------------------------|-----------------|-----------------|----------------|
| 开发量 | ★★★★★ 最少 | ★★★☆☆ 中等 | ★★★★☆ 少 | ★★★★☆ 少 |
| 与现有代码融合 | ★★★★★ 完美融合 | ★★★★☆ 需改 server.ts | ★★★☆☆ 独立 SDK | ★★☆☆☆ 独立部署 |
| 自主可控性 | ★★★☆☆ 中等 | ★★★★★ 最高 | ★★☆☆☆ 受限 | ★★★☆☆ 中等 |
| 扩展性 | ★★★☆☆ 受 Supabase 限制 | ★★★★★ 可水平扩展 | ★★★★☆ 托管扩展 | ★★★★★ 边缘扩展 |
| 成本 | 免费（现有套餐） | VPS $5-10/月 | 免费起步 | 免费起步 |
| 生产稳定性 | ★★★★☆ | ★★★★★ | ★★★★☆ | ★★★★☆ |

---

## 四、推荐路径

### MVP 阶段（1-2周）→ 方案 A：Supabase Realtime

**理由：** 已有 Supabase，零额外成本和配置，最快验证"多人同玩"核心体验。

**需要新增的 Supabase 表：**

```sql
-- 房间表
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,        -- 6位邀请码，如 "ABC123"
  quiz_id TEXT NOT NULL,
  host_user_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'waiting',    -- waiting | playing | finished
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  max_players INT DEFAULT 4
);

-- 房间成员进度表
CREATE TABLE room_players (
  room_id UUID REFERENCES rooms(id),
  user_id UUID REFERENCES profiles(id),
  progress INT DEFAULT 0,           -- 当前答到第几题
  score INT DEFAULT 0,
  finished_at TIMESTAMPTZ,
  PRIMARY KEY (room_id, user_id)
);
```

**游戏流程设计：**

```
[创建房间] → 生成6位邀请码 → 等待大厅（显示在线玩家）
     ↓
[分享邀请码] → 其他玩家输入码加入
     ↓
[Host 点击开始] → 倒计时 3-2-1 → 同步开始答题
     ↓
[答题中] → Presence 实时同步每人进度 → 显示对手进度条
     ↓
[全员完成或超时] → 结算画面（排名 + 用时 + 分数）
```

### 成长阶段（并发 > 50 房间）→ 迁移方案 B：Socket.io

将 Express 升级为有状态 WebSocket 服务，加 Redis 做房间状态共享，部署到 Railway / Fly.io。

---

## 五、游戏模式设计建议

### 模式 1：实时竞速（Battle Royale 风格）
- 所有人同时看到同一题
- 答题速度 + 正确率决定排名
- 先答完的有"时间加成"分

### 模式 2：回合制对决（1v1）
- 交替出题，对方答完才能看到题目
- 减少"快手"优势，考验知识深度
- 适合 1v1 好友对战

### 模式 3：团队模式
- 分成 A / B 两队
- 每队总分 PK
- 适合聚会场景

---

## 六、UI 改动要点

现有 `MCQuizView` 组件需要新增：

1. **大厅界面**：显示房间码、在线玩家头像、等待 Host 开始
2. **对手进度条**：参考现有 `RaceTrack` 组件，改为多人版本
3. **实时答题状态**：对手答完某题时给出微动效
4. **结算排行榜**：替换现有单人结果页，显示全员排名

现有 `RaceTrack`（赛车组件）可直接复用，将 Bot 进度替换为真实玩家 Presence 数据。

---

## 七、下一步行动

- [ ] 在 Supabase 创建 `rooms` 和 `room_players` 表
- [ ] 实现房间创建 / 加入界面（输入邀请码）
- [ ] 在 `MCQuizView` 中接入 Supabase Presence channel
- [ ] 复用 `RaceTrack` 组件显示多人实时进度
- [ ] 测试 2-4 人同时答题的同步延迟

---

*文档日期：2026-03-27*
