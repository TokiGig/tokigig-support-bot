// utils/sessionManager.js

// In-memory session store (for MVP)
const sessions = {};

// Start a new session
async function startSession(userId) {
  sessions[userId] = {
    current_step: 'collect_first_name',
  };
}

// Update an existing session
async function updateSession(userId, updates) {
  if (!sessions[userId]) {
    sessions[userId] = {};
  }
  sessions[userId] = {
    ...sessions[userId],
    ...updates,
  };
}

// Get the current session data
async function getSession(userId) {
  return sessions[userId] || null;
}

// Clear session after signup completed
async function clearSession(userId) {
  delete sessions[userId];
}

module.exports = {
  startSession,
  updateSession,
  getSession,
  clearSession,
};
