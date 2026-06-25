const express = require('express');
const router = express.Router();
const { getExpenses, createExpense, deleteExpense } = require('../controllers/expenseControllers');
const { protect, admin } = require('../middleware/auth');

router.route('/admin/expenses').get(protect, admin, getExpenses);
router.route('/admin/expense/new').post(protect, admin, createExpense);
router.route('/admin/expense/:id').delete(protect, admin, deleteExpense);

module.exports = router;
