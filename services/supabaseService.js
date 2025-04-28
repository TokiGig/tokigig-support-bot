// services/supabaseService.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Main insertUser function
async function insertUser(sessionData) {
  const { first_name, country, role, telegram_handle, email, language } = sessionData;

  let tableName = null;
  if (role === 'worker') {
    tableName = 'workers';
  } else if (role === 'hub_builder') {
    tableName = 'hubs';
  } else if (role === 'investor') {
    tableName = 'investors';
  } else {
    // If 'curious', don't insert into main tables
    return { error: null, data: null };
  }

  const insertData = {
    first_name: first_name || '',
    country: country || '',
    role: role || '',
    telegram_handle: telegram_handle || '',
    email: email || '',
    language: language || 'en',
  };

  const { data, error } = await supabase
    .from(tableName)
    .insert([insertData]);

  if (error) {
    console.error('Supabase insert error:', error);
    return { error };
  }

  return { data };
}

module.exports = {
  insertUser,
};
