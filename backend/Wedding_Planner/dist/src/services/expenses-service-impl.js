"use strict";
exports.__esModule = true;
exports.ExpensesServiceImpl = void 0;
var errors_1 = require("../errors");
var expenses_dao_postgres_1 = require("../DAOs/expenses-dao-postgres");
var ExpensesServiceImpl = /** @class */ (function () {
    function ExpensesServiceImpl() {
        this.expensesDao = new expenses_dao_postgres_1.ExpensesDaoPostgres();
    }
    ExpensesServiceImpl.prototype.registerExpenses = function (expense, weddingId) {
        return this.expensesDao.createExpense(expense);
    };
    ExpensesServiceImpl.prototype.retrieveAllExpenses = function () {
        return this.expensesDao.getAllExpenses();
    };
    ExpensesServiceImpl.prototype.retrieveExpenseById = function (expenseId) {
        return this.expensesDao.getExpenseById(expenseId);
    };
    ExpensesServiceImpl.prototype.updateExpense = function (expense) {
        return this.expensesDao.updateExpense(expense);
    };
    ExpensesServiceImpl.prototype.removeExpenseById = function (expenseId) {
        if (this.expensesDao.getExpenseById(expenseId) === null) {
            throw new errors_1.MissingResourceError("Expense not found.");
        }
        return this.expensesDao.deleteExpenseById(expenseId);
    };
    return ExpensesServiceImpl;
}());
exports.ExpensesServiceImpl = ExpensesServiceImpl;
