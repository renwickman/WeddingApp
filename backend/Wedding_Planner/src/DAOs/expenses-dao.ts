import { Expenses } from "../entities";

export interface ExpensesDAO{

    createExpense(expense:Expenses):Promise<Expenses>;

    getExpenseById(expenseId:number):Promise<Expenses>;
    getAllExpenses(): Promise<Expenses[]>;

    updateExpense(expense:Expenses):Promise<Expenses>;

    deleteExpenseById(expenseId:number):Promise<boolean>;
}