"use strict";
exports.__esModule = true;
exports.Expenses = exports.Wedding = void 0;
var Wedding = /** @class */ (function () {
    function Wedding(weddingId, groomName, brideName, weddingLocation, weddingBudget, weddingDate) {
        this.weddingId = weddingId;
        this.groomName = groomName;
        this.brideName = brideName;
        this.weddingLocation = weddingLocation;
        this.weddingBudget = weddingBudget;
        this.weddingDate = weddingDate;
    }
    return Wedding;
}());
exports.Wedding = Wedding;
var Expenses = /** @class */ (function () {
    function Expenses(expenseId, expenseAmount, reason, weddingId) {
        this.expenseId = expenseId;
        this.expenseAmount = expenseAmount;
        this.reason = reason;
        this.weddingId = weddingId;
    }
    return Expenses;
}());
exports.Expenses = Expenses;
