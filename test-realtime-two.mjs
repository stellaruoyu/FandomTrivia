import { createClient } from '@supabase/supabase-js';

const url = 'https://yurfplpwpdayemyxpbxr.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1cmZwbHB3cGRheWVteXhwYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODc5MzAsImV4cCI6MjA4NzU2MzkzMH0.thPXJWOuK6ML5liM5tEp2Czd_VzM2EhUA3yFkDmv0jM';

// Client 1
const supabase1 = createClient(url, key);
const channel1 = supabase1.channel('test-lobby-sync', {
  config: { presence: { key: 'client-1' } }
});

// Client 2
const supabase2 = createClient(url, key);
const channel2 = supabase2.channel('test-lobby-sync', {
  config: { presence: { key: 'client-2' } }
});

console.log('Starting Client 1');
channel1
  .on('presence', { event: 'sync' }, () => {
    console.log('Client 1 Presence Sync:', Object.keys(channel1.presenceState()));
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel1.track({ name: 'User 1' });
      console.log('Client 1 tracked');
    }
  });

setTimeout(() => {
  console.log('Starting Client 2');
  channel2
    .on('presence', { event: 'sync' }, () => {
      console.log('Client 2 Presence Sync:', Object.keys(channel2.presenceState()));
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel2.track({ name: 'User 2' });
        console.log('Client 2 tracked');
      }
    });
}, 1500);

setTimeout(() => {
    console.log('Final Client 1 state:', Object.keys(channel1.presenceState()));
    console.log('Final Client 2 state:', Object.keys(channel2.presenceState()));
    process.exit(0);
}, 5000);
