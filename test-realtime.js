const { createClient } = require('@supabase/supabase-js');
const url = 'https://yurfplpwpdayemyxpbxr.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1cmZwbHB3cGRheWVteXhwYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5ODc5MzAsImV4cCI6MjA4NzU2MzkzMH0.thPXJWOuK6ML5liM5tEp2Czd_VzM2EhUA3yFkDmv0jM';

const supabase = createClient(url, key);

const channel = supabase.channel('test-lobby', {
  config: { presence: { key: 'tester-1' } }
});

channel
  .on('presence', { event: 'sync' }, () => {
    console.log('Presence sync', channel.presenceState());
  })
  .subscribe(async (status, err) => {
    console.log('Status:', status);
    if (err) console.error('Error:', err);
    if (status === 'SUBSCRIBED') {
      console.log('Subscribed successfully');
      try {
        const res = await channel.track({ online_at: new Date().toISOString() });
        console.log('Track result:', res);
      } catch (e) {
        console.error('Track error:', e);
      }
      setTimeout(() => process.exit(0), 3000);
    } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        setTimeout(() => process.exit(1), 1000);
    }
  });

console.log('Attempting to connect to Supabase Realtime...');
