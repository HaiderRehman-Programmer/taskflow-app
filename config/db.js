const Datastore = require('@seald-io/nedb');
const path = require('path');

// NeDB stores data in local .db files — no MongoDB needed!
const usersDB = new Datastore({
  filename: path.join(__dirname, '../data/users.db'),
  autoload: true,
});

const tasksDB = new Datastore({
  filename: path.join(__dirname, '../data/tasks.db'),
  autoload: true,
});

// Ensure unique index on user email
usersDB.ensureIndex({ fieldName: 'email', unique: true });

console.log('✅ NeDB file-based database ready (no installation required)');

module.exports = { usersDB, tasksDB };
