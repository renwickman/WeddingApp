import { ExpensesDAO } from "../src/DAOs/expenses-dao";
import { Expenses, Wedding } from "../src/entities";
import { runner } from "../src/connection";
import { ExpensesDaoPostgres } from "../src/DAOs/expenses-dao-postgres";

const expenseDAO:ExpensesDAO = new ExpensesDaoPostgres();
let date: Date = new Date("11-20-2021");
const testWedding:Wedding = new Wedding(0, 'Eddie', 'Jackie', 'Austin, TX', 10000, date);
const testExpense:Expenses = new Expenses(0, 1500, 'Honeymoon', testWedding.weddingId + 1);

test("Create an expense", async () =>{
    const result = await expenseDAO.createExpense(testExpense);
    expect(result.expenseId).not.toBe(0);
});

test("Get expense by Id", async ()=>{
    let expense:Expenses = new Expenses(0, 1500, 'Honeymoon', testWedding.weddingId + 1);
    expense = await expenseDAO.createExpense(expense);

    let retrievedExpense:Expenses = await expenseDAO.getExpenseById(expense.expenseId);
 
    expect(retrievedExpense.expenseAmount).toBe(expense.expenseAmount);
});

test("Get all expenses", async ()=>{
    let expense1:Expenses = new Expenses(0, 1500, 'Honeymoon', testWedding.weddingId + 1);
    let expense2:Expenses = new Expenses(0, 1200, 'Plane Trip to Cuba', testWedding.weddingId + 1);
    let expense3:Expenses = new Expenses(0, 200, 'Flowers', testWedding.weddingId + 1);
    let expense4:Expenses = new Expenses(0, 1500, 'Tour Guide', testWedding.weddingId + 1);
    await expenseDAO.createExpense(expense1);
    await expenseDAO.createExpense(expense2);
    await expenseDAO.createExpense(expense3);
    await expenseDAO.createExpense(expense4);

    const expenses:Expenses[] = await expenseDAO.getAllExpenses();

    expect(expenses.length).toBeGreaterThanOrEqual(4);
});

test("Update expense", async() => {
    let targetedExpense:Expenses = new Expenses(0, 1500, 'Honeymoon', testWedding.weddingId + 1);
    targetedExpense = await expenseDAO.createExpense(targetedExpense);
    targetedExpense.reason = 'Tour';

    targetedExpense = await expenseDAO.updateExpense(targetedExpense);


    expect(targetedExpense.reason).toBe('Tour');
});

test("Delete expense", async () =>{
    let targetedExpense:Expenses = new Expenses(0, 1500, 'Honeymoon', testWedding.weddingId + 1);
    targetedExpense = await expenseDAO.createExpense(targetedExpense);

    const result:boolean = await expenseDAO.deleteExpenseById(targetedExpense.expenseId);
    expect(result).toBeTruthy();
});

afterAll(async()=>{
    runner.end()
});