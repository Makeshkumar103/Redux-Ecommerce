const expenseModel = require('../models/expenseModel');

exports.getExpenses = async (req, res, next) => {
    try {
        const expenses = await expenseModel.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.createExpense = async (req, res, next) => {
    try {
        const { title, amount, category } = req.body;
        const expense = await expenseModel.create({ title, amount, category });
        res.status(201).json({
            success: true,
            expense
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {
        const expense = await expenseModel.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }
        res.json({
            success: true,
            message: 'Expense deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
