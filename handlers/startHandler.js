// handlers/startHandler.js

const sessionManager = require('../utils/sessionManager');

module.exports = async (ctx) => {
  try {
    const userId = ctx.from.id;

    // Initialize user session if not exists
    await sessionManager.startSession(userId);

    await ctx.reply(`👋 Welcome to TokiGig!

We’re on a mission to help gig workers earn, grow, and own more.

Let's get you started! 🚀
    
What's your first name?`);
    
    // Update session to next step
    await sessionManager.updateSession(userId, { current_step: 'collect_first_name' });

  } catch (error) {
    console.error('Error in startHandler:', error);
    await ctx.reply('⚠️ Oops! Something went wrong. Please try again.');
  }
};
