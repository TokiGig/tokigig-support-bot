// handlers/signupHandler.js

const sessionManager = require('../utils/sessionManager');

module.exports = async (ctx) => {
  try {
    const userId = ctx.from.id;
    const userMessage = ctx.message.text;
    
    // Get the current session state
    const session = await sessionManager.getSession(userId);

    if (!session || !session.current_step) {
      // No active session — ignore or ask user to /start again
      return;
    }

    // Auto-capture Telegram language
    const userLang = ctx.from.language_code || 'en';

    // Handle based on current signup step
    if (session.current_step === 'collect_first_name') {
      // Save first name + language
      await sessionManager.updateSession(userId, { 
        first_name: userMessage,
        language: userLang, // Capture here early
        current_step: 'collect_country'
      });

      await ctx.reply(`🌍 Great to meet you, ${userMessage}! What country are you joining us from?`);

    } else if (session.current_step === 'collect_country') {
      // Save country
      await sessionManager.updateSession(userId, { 
        country: userMessage,
        current_step: 'select_role'
      });

      // Move to role selection
      const buttons = [
        [{ text: '🎯 Gig Worker', callback_data: 'role_worker' }],
        [{ text: '🏗️ Hub Builder', callback_data: 'role_hub_builder' }],
        [{ text: '💰 Investor', callback_data: 'role_investor' }],
        [{ text: '👀 Curious', callback_data: 'role_curious' }]
      ];

      await ctx.reply('Awesome! Now, how would you describe yourself?', {
        reply_markup: {
          inline_keyboard: buttons,
        },
      });
    }
    
  } catch (error) {
    console.error('Error in signupHandler:', error);
    await ctx.reply('⚠️ Oops! Something went wrong. Please try again.');
  }
};
