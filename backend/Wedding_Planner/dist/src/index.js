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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var errors_1 = require("./errors");
var express_1 = __importDefault(require("express"));
var expenses_service_impl_1 = require("./services/expenses-service-impl");
var wedding_service_impl_1 = require("./services/wedding-service-impl");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
var weddingService = new wedding_service_impl_1.WeddingServiceImpl();
var expensesService = new expenses_service_impl_1.ExpensesServiceImpl();
// - GET /weddings
app.get("/weddings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weddings, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, weddingService.retrieveAllWeddings()];
            case 1:
                weddings = _a.sent();
                res.send(weddings);
                res.status(200);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof errors_1.MissingResourceError) {
                    res.send(error_1);
                    res.status(404);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// - GET /weddings/:id
app.get("/weddings/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weddingId, wedding, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                weddingId = Number(req.params.id);
                return [4 /*yield*/, weddingService.retrieveWeddingById(weddingId)];
            case 1:
                wedding = _a.sent();
                res.send(wedding);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof errors_1.MissingResourceError) {
                    res.send(error_2);
                    res.status(404);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// - GET /weddings/:id/expenses
app.get("/weddings/:id/expenses", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var theWedExps, currentId, theExpenses, i, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                theWedExps = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                currentId = Number(req.params.id);
                return [4 /*yield*/, expensesService.retrieveAllExpenses()];
            case 2:
                theExpenses = _a.sent();
                for (i = 0; i < theExpenses.length; i++) {
                    if (theExpenses[i].weddingId === currentId) {
                        theWedExps.push(theExpenses[i]);
                    }
                }
                res.send(theWedExps);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                if (error_3 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_3);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// - POST /weddings
app.post("/weddings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wedding, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                wedding = req.body;
                return [4 /*yield*/, weddingService.registerWedding(wedding)];
            case 1:
                wedding = _a.sent();
                res.send(wedding);
                res.status(201);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                if (error_4 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_4);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// - PUT /weddings/:id
app.put("/weddings/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weddingId, wedding, updatedWedding, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                weddingId = Number(req.params.id);
                wedding = req.body;
                wedding.weddingId = weddingId;
                return [4 /*yield*/, weddingService.updateWedding(wedding)];
            case 1:
                updatedWedding = _a.sent();
                return [4 /*yield*/, weddingService.updateWedding(updatedWedding)];
            case 2:
                _a.sent();
                res.send(updatedWedding);
                res.status(200);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                if (error_5 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_5);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// - DELETE /weddings/:id
app["delete"]("/weddings/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weddingId, theExpenses, i, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                weddingId = Number(req.params.id);
                return [4 /*yield*/, expensesService.retrieveAllExpenses()];
            case 1:
                theExpenses = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < theExpenses.length)) return [3 /*break*/, 5];
                if (!(theExpenses[i].weddingId === weddingId)) return [3 /*break*/, 4];
                return [4 /*yield*/, expensesService.removeExpenseById(theExpenses[i].expenseId)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, weddingService.removeWeddingById(weddingId)];
            case 6:
                _a.sent();
                res.send(weddingId + " has been deleted.");
                return [3 /*break*/, 8];
            case 7:
                error_6 = _a.sent();
                if (error_6 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_6);
                }
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
// - GET /expenses
app.get("/expenses", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expenses, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, expensesService.retrieveAllExpenses()];
            case 1:
                expenses = _a.sent();
                res.send(expenses);
                res.status(200);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                if (error_7 instanceof errors_1.MissingResourceError) {
                    res.send(error_7);
                    res.status(404);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// - GET /expenses/:id
app.get("/expenses/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expensesId, expenses, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                expensesId = Number(req.params.id);
                return [4 /*yield*/, expensesService.retrieveExpenseById(expensesId)];
            case 1:
                expenses = _a.sent();
                res.send(expenses);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                if (error_8 instanceof errors_1.MissingResourceError) {
                    res.send(error_8);
                    res.status(404);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// - POST /expenses
app.post("/weddings/:id/expenses", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weddingId, exp, newExp, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                weddingId = Number(req.params.id);
                exp = req.body;
                exp.weddingId = weddingId;
                return [4 /*yield*/, expensesService.registerExpenses(exp, weddingId)];
            case 1:
                newExp = _a.sent();
                res.send(newExp);
                res.status(201);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                if (error_9 instanceof errors_1.MissingResourceError) {
                    res.send(error_9);
                    res.status(404);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// - PUT /expenses/:id
app.put("/expenses/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expensesId, newExp, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                expensesId = Number(req.params.id);
                newExp = req.body;
                return [4 /*yield*/, expensesService.updateExpense(newExp)];
            case 1:
                _a.sent();
                res.send(newExp);
                res.status(200);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                if (error_10 instanceof errors_1.MissingResourceError) {
                    res.send(error_10);
                    res.status(404);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// - DELETE /expenses/:id
app["delete"]("/expenses/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expensesId, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                expensesId = Number(req.params.id);
                return [4 /*yield*/, expensesService.removeExpenseById(expensesId)];
            case 1:
                _a.sent();
                res.status(200);
                res.send(expensesId + " has been deleted.");
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                if (error_11 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_11);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// - PATCH /weddings/:id
app.patch("/weddings/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wedExpsArr, wedId, wed, wedExps, i, j, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wedExpsArr = [];
                wedId = Number(req.params.id);
                return [4 /*yield*/, weddingService.retrieveWeddingById(wedId)];
            case 1:
                wed = _a.sent();
                return [4 /*yield*/, expensesService.retrieveAllExpenses()];
            case 2:
                wedExps = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 8, , 9]);
                // wed.weddingBudget = wed.weddingBudget - wedExps.expenseAmount;
                for (i = 0; i < wedExps.length; i++) {
                    if (wedExps[i].weddingId === wedId) {
                        wedExpsArr.push(wedExps[i]);
                    }
                }
                j = 0;
                _a.label = 4;
            case 4:
                if (!(j < wedExpsArr.length)) return [3 /*break*/, 7];
                return [4 /*yield*/, weddingService.withdrawFromBudget(wed, wedExps[j])];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                j++;
                return [3 /*break*/, 4];
            case 7:
                res.send(wed);
                return [3 /*break*/, 9];
            case 8:
                error_12 = _a.sent();
                if (error_12 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_12);
                }
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
app.listen(process.env.PORT || 3004, function () {
    console.log("Application Started!");
});
