// handlers/roleHandler.js

const sessionManager = require('../utils/sessionManager');

module.exports = async (ctx) => {
  try {
    const userId = ctx.from.id;
    const callbackData = ctx.callbackQuery.data; // This is role_worker, role_hub_builder, etc.

    // Map button pressed to clean role value
    const roleMapping = {
      role_worker: 'worker',
      role_hub_builder: 'hub_builder',
      role_investor: 'investor',
      role_curious: 'curious'
    };

    const selectedRole = roleMapping[callbackData];

    if (!selectedRole) {
      await ctx.reply('⚠️ Sorry, something went wrong. Please try again.');
      return;
    }

    // Capture Telegram Handle
    const telegramHandle = ctx.from.username ? `@${ctx.from.username}` : null;

    // Update session with role and telegram handle
    await sessionManager.updateSession(userId, {
      role: selectedRole,
      telegram_handle: telegramHandle,
      current_step: 'collect_email_optional'
    });

    // Ask for email (optional)
    await ctx.reply(`📧 (Optional) Would you like to leave your email for updates and early access?\n\nIf yes, type it now.\nIf not, just type "skip".`);

  } catch (error) {
    console.error('Error in roleHandler:', error);
    await ctx.reply('⚠️ Oops! Something went wrong. Please try again.');
  }
};
