const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin', 'manager', 'student', 'faculty'],
        required: true
    },
    organization:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizations'
    }
}, {
    timestamps: true,
}
);

const User = new mongoose.model('User', userSchema);

module.exports = {User};