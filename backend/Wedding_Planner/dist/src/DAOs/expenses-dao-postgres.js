"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ExpensesDaoPostgres = void 0;
var entities_1 = require("../entities");
var connection_1 = require("../connection");
var errors_1 = require("../errors");
var ExpensesDaoPostgres = /** @class */ (function () {
    function ExpensesDaoPostgres() {
    }
    ExpensesDaoPostgres.prototype.createExpense = function (expense) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, values, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "insert into expenses(expense_amount, reason, w_id) values ($1,$2,$3) returning expense_id";
                        values = [expense.expenseAmount, expense.reason, expense.weddingId];
                        return [4 /*yield*/, connection_1.runner.query(sql, values)];
                    case 1:
                        result = _a.sent();
                        expense.expenseId = result.rows[0].expense_id;
                        return [2 /*return*/, expense];
                }
            });
        });
    };
    ExpensesDaoPostgres.prototype.getExpenseById = function (expenseId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, values, result, row, expense;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "select * from expenses where expense_id = $1";
                        values = [expenseId];
                        return [4 /*yield*/, connection_1.runner.query(sql, values)];
                    case 1:
                        result = _a.sent();
                        if (result.rowCount === 0) {
                            throw new errors_1.MissingResourceError("The account with id " + expenseId + " does not exist");
                        }
                        row = result.rows[0];
                        expense = new entities_1.Expenses(row.expense_id, row.expense_amount, row.reason, row.w_id);
                        return [2 /*return*/, expense];
                }
            });
        });
    };
    ExpensesDaoPostgres.prototype.getAllExpenses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result, expenses, _i, _a, row, newExpense;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "select * from expenses";
                        return [4 /*yield*/, connection_1.runner.query(sql)];
                    case 1:
                        result = _b.sent();
                        expenses = [];
                        for (_i = 0, _a = result.rows; _i < _a.length; _i++) {
                            row = _a[_i];
                            newExpense = new entities_1.Expenses(row.expense_id, row.expense_amount, row.reason, row.w_id);
                            expenses.push(newExpense);
                        }
                        return [2 /*return*/, expenses];
                }
            });
        });
    };
    ExpensesDaoPostgres.prototype.updateExpense = function (updateExpense) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, values, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'update expenses set expense_amount=$1, reason=$2, w_id=$3 where expense_id=$4';
                        values = [updateExpense.expenseAmount, updateExpense.reason, updateExpense.weddingId, updateExpense.expenseId];
                        return [4 /*yield*/, connection_1.runner.query(sql, values)];
                    case 1:
                        result = _a.sent();
                        if (result.rowCount === 0) {
                            throw new errors_1.MissingResourceError("The expense with id " + updateExpense.expenseId + " does not exist");
                        }
                        return [2 /*return*/, updateExpense];
                }
            });
        });
    };
    ExpensesDaoPostgres.prototype.deleteExpenseById = function (expenseId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, values, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'delete from expenses where expense_id = $1';
                        values = [expenseId];
                        return [4 /*yield*/, connection_1.runner.query(sql, values)];
                    case 1:
                        result = _a.sent();
                        if (result.rowCount === 0) {
                            throw new errors_1.MissingResourceError("The expense with id " + expenseId + " does not exist");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return ExpensesDaoPostgres;
}());
exports.ExpensesDaoPostgres = ExpensesDaoPostgres;
