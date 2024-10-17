const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manager: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
}, { timestamps: true }
)

const Org = new mongoose.model('Organization', orgSchema);

module.exports = {Org};