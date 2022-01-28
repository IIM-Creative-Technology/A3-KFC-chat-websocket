const database = require('../services/database');

module.exports = database.model('User', {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    created_at: { type: Date, default: Date.now }
});