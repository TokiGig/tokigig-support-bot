const { Telegraf, Markup } = require('telegraf');
require('dotenv').config(); // Load BOT_TOKEN from .env

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log('🚀 TokiGig Bot is live — built for hustle, not hype.');

// 🧵 Scoped /start command — responds only in Start Here topic
bot.command('start', (ctx) => {
  const threadId = ctx.message?.message_thread_id;
  const START_HERE_THREAD_ID = 2; // ← Replace with your actual topic ID

  if (ctx.chat.type === 'supergroup' && threadId === START_HERE_THREAD_ID) {
    ctx.reply(`👋 *Welcome to TokiGig*  
We’re building a crypto-powered gig economy — for real workers, not speculators.  

What brings you here today?`, {
      parse_mode: 'Markdown',
      ...Markup.keyboard([
        ['🧑‍🔧 I’m a Gig Worker', '📍 I Want to Start a HUB'],
        ['💰 I’m an Investor', '👀 Just Curious'],
        ['📬 Join Updates']
      ])
        .oneTime()
        .resize()
    });
  }
});

// 👉 Button Response Flows
bot.hears('🧑‍🔧 I’m a Gig Worker', (ctx) => {
  ctx.reply(`🚀 Nice. We're launching across Latin America, Africa, and Southeast Asia — starting with Brazil, Kenya, Indonesia, Colombia, and the U.S.

You don’t need crypto experience. Just curiosity, hustle, or heart. We’ll guide you from there.

👉 Tap below to get on the list:`,
    Markup.inlineKeyboard([
      [{ text: 'Join Waitlist', url: 'https://tokigig.com/waitlist' }]
    ])
  );
});

bot.hears('📍 I Want to Start a HUB', (ctx) => {
  ctx.reply(`🛠️ TokiGig Hubs are local launchpads.  
They help onboard workers, match gigs, and grow the mission in their region.

🔥 Want to lead one? Apply below:`,
    Markup.inlineKeyboard([
      [{ text: 'Apply to Start a HUB', url: 'https://tokigig.com/hub-central' }],
      [{ text: 'Learn How Hubs Work', url: 'https://tokigig.com/hub-central' }]
    ])
  );
});

bot.hears('💰 I’m an Investor', (ctx) => {
  ctx.reply(`📈 TokiGig is early-stage, lean-built, and globally scalable.  
If you're into real-world impact + upside — you're in the right place.

💼 Learn more here:`,
    Markup.inlineKeyboard([
      [{ text: 'Investor Overview', url: 'https://tokigig.com/investors' }]
    ])
  );
});

bot.hears('👀 Just Curious', (ctx) => {
  ctx.reply(`👀 No problem — we’re building in public.

You can follow the journey, explore the mission, and vibe with the community.

🔗 Check this out:`,
    Markup.inlineKeyboard([
      [{ text: 'What is TokiGig?', url: 'https://tokigig.com/about' }]
    ])
  );
});

bot.hears('📬 Join Updates', (ctx) => {
  ctx.reply(`📰 Stay in the loop.  
Major launches, country rollouts, and alpha drops will hit here first.`,
    Markup.inlineKeyboard([
      [{ text: 'Join Telegram Channel', url: 'https://t.me/TokiGigUpdates' }]
    ])
 );
});

// 🔁 Command aliases for CLI-style users
bot.command('waitlist', (ctx) => {
  ctx.reply('👇 Join the waitlist here:', Markup.inlineKeyboard([
    [{ text: 'Join Waitlist', url: 'https://tokigig.com/waitlist' }]
  ]));
});

bot.command('hub', (ctx) => {
  ctx.reply('📍 Want to launch a HUB? Start here:', Markup.inlineKeyboard([
    [{ text: 'Start a HUB', url: 'https://tokigig.com/hub-central' }]
  ]));
});

bot.command('invest', (ctx) => {
  ctx.reply('💼 Explore our investor overview:', Markup.inlineKeyboard([
    [{ text: 'Investor Overview', url: 'https://tokigig.com/investors' }]
  ]));
});

bot.command('about', (ctx) => {
  ctx.reply('📖 Learn about the TokiGig mission:', Markup.inlineKeyboard([
    [{ text: 'What is TokiGig?', url: 'https://tokigig.com/about' }]
  ]));
});

bot.command('updates', (ctx) => {
  ctx.reply('📬 Join our Telegram updates channel:', Markup.inlineKeyboard([
    [{ text: 'Join Telegram Channel', url: 'https://t.me/TokiGigUpdates' }]
  ]));
});

// Fallback response
bot.on('text', (ctx) => {
  ctx.reply('⚙️ Try /start to see options again.');
});

// 🔍 Log messages for debugging
bot.on('message', (ctx) => {
  console.log('📬 Message received:');
  console.log('Chat ID:', ctx.chat.id);
  console.log('Thread ID:', ctx.message?.message_thread_id);
  console.log('Text:', ctx.message.text);
});

// ✅ Start the bot
bot.launch();
console.log('✅ Bot running and listening for commands.');

// 🧼 Graceful shutdown handling
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
