const database = require('../services/database');

module.exports = database.model('Message', {
    content: String,
    conv_id: String,
    created_by: String,
    created_at: { type: Date, default: Date.now },
});