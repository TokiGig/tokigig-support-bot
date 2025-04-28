// ecosystem.config.js

module.exports = {
    apps: [
      {
        name: 'tokigig-telegram-bot',
        script: './bot.js',
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          NODE_ENV: 'production',
          BOT_TOKEN: process.env.BOT_TOKEN,
          SUPABASE_URL: process.env.SUPABASE_URL,
          SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        }
      }
    ]
  };
  