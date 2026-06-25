const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter expense title']
    },
    amount: {
        type: Number,
        required: [true, 'Please enter expense amount']
    },
    category: {
        type: String,
        required: [true, 'Please enter expense category']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const expenseModel = mongoose.model('Expense', expenseSchema);

module.exports = expenseModel;
