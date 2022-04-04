import { Expenses, Wedding } from "../entities";

export default interface ExpensesService{

    registerExpenses(expense:Expenses, weddingId: number):Promise<Expenses>;

    retrieveAllExpenses():Promise<Expenses[]>


    retrieveExpenseById(expenseId:number):Promise<Expenses>;

    updateExpense(expense:Expenses):Promise<Expenses>;

    removeExpenseById(expenseId:number):Promise<boolean>;
}