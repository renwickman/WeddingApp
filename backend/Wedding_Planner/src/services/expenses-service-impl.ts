import { MissingResourceError, OverdrawnError } from "../errors";
import { ExpensesDAO } from "../DAOs/expenses-dao";
import { ExpensesDaoPostgres } from "../DAOs/expenses-dao-postgres";
import { Expenses, Wedding } from "../entities";
import ExpensesService from "./expenses-service";


export class ExpensesServiceImpl implements ExpensesService{

    expensesDao:ExpensesDAO = new ExpensesDaoPostgres();

    registerExpenses(expense: Expenses, weddingId: number): Promise<Expenses> {
        return this.expensesDao.createExpense(expense);
    }
    retrieveAllExpenses(): Promise<Expenses[]> {
        return this.expensesDao.getAllExpenses();
    }

    retrieveExpenseById(expenseId: number): Promise<Expenses> {
        return this.expensesDao.getExpenseById(expenseId);
    }
    
    updateExpense(expense: Expenses): Promise<Expenses> {
        return this.expensesDao.updateExpense(expense);
    }

    removeExpenseById(expenseId: number): Promise<boolean> {
        if (this.expensesDao.getExpenseById(expenseId) === null){
            throw new MissingResourceError("Expense not found.");
        }
        return this.expensesDao.deleteExpenseById(expenseId);
    }
}
