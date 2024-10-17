const mongoose = require('mongoose');

const dataSourceSchema = new mongoose.Schema({
    pdf: {
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
        ref: 'Organizations',
        required: true
    }
});

const DataSource = new mongoose.model('DataSource', dataSourceSchema);

module.exports = {DataSource};