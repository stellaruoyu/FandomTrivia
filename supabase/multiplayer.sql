-- =============================================================================
-- FandomTrivia — Multiplayer Rooms Table
-- Run this in your Supabase project → SQL Editor
-- =============================================================================

-- 1. Create the rooms table
CREATE TABLE IF NOT EXISTS public.rooms (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT        UNIQUE NOT NULL,          -- 6-char invite code
  quiz_id         TEXT        NOT NULL,                 -- quiz title / label
  host_user_id    UUID        NOT NULL,                 -- profiles.id of host
  status          TEXT        NOT NULL DEFAULT 'waiting', -- waiting | playing | finished
  question_order  JSONB       DEFAULT NULL,             -- array of question indices
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- 3. Policies
--    Anyone can read rooms (needed to look up a room by code before auth join)
CREATE POLICY "Anyone can view rooms"
  ON public.rooms FOR SELECT
  USING (true);

--    Authenticated users can create a room for themselves
CREATE POLICY "Authenticated users can create rooms"
  ON public.rooms FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = host_user_id);

--    Only the host can update their room (to start the game / persist question order)
CREATE POLICY "Host can update their room"
  ON public.rooms FOR UPDATE
  TO authenticated
  USING (auth.uid() = host_user_id);

-- 4. (Optional) Auto-clean stale rooms older than 2 hours
--    Requires pg_cron extension — enable it in Supabase Dashboard → Extensions if desired.
-- SELECT cron.schedule(
--   'clean-stale-rooms',
--   '0 * * * *',   -- every hour
--   $$DELETE FROM public.rooms WHERE created_at < NOW() - INTERVAL '2 hours'$$
-- );
