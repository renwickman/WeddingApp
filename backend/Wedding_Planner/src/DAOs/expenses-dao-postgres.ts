import { Expenses } from '../entities';
import { ExpensesDAO } from './expenses-dao';
import { runner } from '../connection';
import { MissingResourceError } from '../errors';

export class ExpensesDaoPostgres implements ExpensesDAO{
    
    async createExpense(expense: Expenses): Promise<Expenses> {
        const sql:string = "insert into expenses(expense_amount, reason, w_id) values ($1,$2,$3) returning expense_id"
        const values = [expense.expenseAmount, expense.reason, expense.weddingId];
        const result = await runner.query(sql, values);
        expense.expenseId = result.rows[0].expense_id;
        return expense;
    }

    async getExpenseById(expenseId: number): Promise<Expenses> {
        const sql:string = "select * from expenses where expense_id = $1";
        const values = [expenseId];
        const result = await runner.query(sql, values);
        if (result.rowCount === 0){
            throw new MissingResourceError(`The account with id ${expenseId} does not exist`);
        }
        const row = result.rows[0];
        const expense:Expenses = new Expenses(
                row.expense_id,
                row.expense_amount,
                row.reason,
                row.w_id);
        return expense;
    }

   async getAllExpenses(): Promise<Expenses[]> {
        const sql:string = "select * from expenses";
        const result = await runner.query(sql);
        const expenses:Expenses[] = [];
        for (const row of result.rows){
            const newExpense:Expenses = new Expenses(
                row.expense_id,
                row.expense_amount,
                row.reason,
                row.w_id);
            expenses.push(newExpense);
        }
        return expenses;
    }
    
    async updateExpense(updateExpense: Expenses): Promise<Expenses> {
        const sql:string = 'update expenses set expense_amount=$1, reason=$2, w_id=$3 where expense_id=$4'
        const values = [updateExpense.expenseAmount, updateExpense.reason, updateExpense.weddingId, updateExpense.expenseId];
        const result = await runner.query(sql, values);
        if(result.rowCount === 0){
            throw new MissingResourceError(`The expense with id ${updateExpense.expenseId} does not exist`);
        }
        return updateExpense;
    }

    async deleteExpenseById(expenseId: number): Promise<boolean> {
        const sql:string = 'delete from expenses where expense_id = $1'
        const values = [expenseId];
        const result = await runner.query(sql, values);
        if (result.rowCount === 0){
            throw new MissingResourceError(`The expense with id ${expenseId} does not exist`)
            }
        return true;
        }
    }
