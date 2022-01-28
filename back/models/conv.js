const database = require('../services/database');

module.exports = database.model('Conv', {
    name: String,
    members: Array,
    created_by: String,
    created_at: { type: Date, default: Date.now },
});