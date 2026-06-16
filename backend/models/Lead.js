const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    source: { type: String, default: 'Direct' },
    status: { 
        type: String, 
        enum: ['new', 'Contacted', 'Converted'], 
        default: 'new' 
    },
    notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);