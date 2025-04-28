// bot.js

require('dotenv').config();
const { Telegraf } = require('telegraf');

// Handlers
const startHandler = require('./handlers/startHandler');
const signupHandler = require('./handlers/signupHandler');
const roleHandler = require('./handlers/roleHandler');
const ctaHandler = require('./handlers/ctaHandler');

// Initialize Bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware: basic logging (optional)
bot.use(async (ctx, next) => {
  console.log(`Message from ${ctx.from.username || ctx.from.id}: ${ctx.message?.text || ctx.callbackQuery?.data}`);
  await next();
});

// Route Handlers
bot.start(startHandler);                   // Handle /start command
bot.on('text', signupHandler);              // Handle normal text replies (first name, country, email/skip)
bot.on('callback_query', roleHandler);      // Handle role button clicks

// Capture Email Final Step
bot.hears(/.+/, ctaHandler);                // Catch any leftover text during "collect_email_optional" step

// Launch Bot
bot.launch()
  .then(() => console.log('🚀 TokiGig Bot 2.0 is now running...'))
  .catch((err) => console.error('Bot failed to launch:', err));

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
