import { MissingResourceError, OverdrawnError } from './errors';
import express from 'express';

import ExpensesService from './services/expenses-service';
import { ExpensesServiceImpl } from './services/expenses-service-impl';

import WeddingService from './services/wedding-service';
import { WeddingServiceImpl } from './services/wedding-service-impl';
import { Expenses, Wedding } from './entities';

import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());


const weddingService:WeddingService = new WeddingServiceImpl();
const expensesService:ExpensesService = new ExpensesServiceImpl();


// - GET /weddings
app.get("/weddings", async (req, res) => {
    try {
        const weddings:Wedding[] = await weddingService.retrieveAllWeddings();
        res.send(weddings);
        res.status(200);
    } catch (error) {
        if (error instanceof MissingResourceError){
            res.send(error);
            res.status(404);
        }
    }
});


// - GET /weddings/:id
app.get("/weddings/:id", async (req, res) => {
    try {
        const weddingId = Number(req.params.id);
        const wedding = await weddingService.retrieveWeddingById(weddingId);
        res.send(wedding);
    } catch (error) {
        if (error instanceof MissingResourceError){
            res.send(error);
            res.status(404);
        }
    }
});

// - GET /weddings/:id/expenses
app.get("/weddings/:id/expenses", async (req, res)=>{
    let theWedExps = [];
    try {
        const currentId = Number(req.params.id);
        let theExpenses:Expenses[] = await expensesService.retrieveAllExpenses();
        for (let i = 0; i < theExpenses.length; i++){
            if (theExpenses[i].weddingId === currentId){
                theWedExps.push(theExpenses[i]);
            }
        }
        res.send(theWedExps);
    } catch (error){
        if (error instanceof MissingResourceError){
            res.status(404);
            res.send(error);
        } 
    } 
});

// - POST /weddings
app.post("/weddings", async (req, res) =>{
    try {
        let wedding:Wedding = req.body;
        wedding = await weddingService.registerWedding(wedding);
        res.send(wedding);
        res.status(201);
    } catch (error){
        if (error instanceof MissingResourceError){
            res.status(404);
            res.send(error);
        } 
    }
});


// - PUT /weddings/:id
app.put("/weddings/:id", async (req, res) => {
    try{
        const weddingId = Number(req.params.id);
        const wedding:Wedding = req.body;
        wedding.weddingId = weddingId;
        const updatedWedding = await weddingService.updateWedding(wedding);
        await weddingService.updateWedding(updatedWedding);
        res.send(updatedWedding);
        res.status(200);
    } catch (error) {
        if (error instanceof MissingResourceError){
            res.status(404);
            res.send(error);
        }
    }
});


// - DELETE /weddings/:id
app.delete("/weddings/:id", async (req, res)=>{
    try {
        const weddingId = Number(req.params.id);
        let theExpenses:Expenses[] = await expensesService.retrieveAllExpenses();
        for (let i = 0; i < theExpenses.length; i++){
            if (theExpenses[i].weddingId === weddingId){
                await expensesService.removeExpenseById(theExpenses[i].expenseId)
            }
        }
        await weddingService.removeWeddingById(weddingId);
        res.send(`${weddingId} has been deleted.`);
    } catch (error) {
        if (error instanceof MissingResourceError){
            res.status(404);
            res.send(error);
        }
    }
});



// - GET /expenses
app.get("/expenses", async (req, res)=>{
    try {
        const expenses:Expenses[] = await expensesService.retrieveAllExpenses();
        res.send(expenses);
        res.status(200);
    } catch (error){
        if (error instanceof MissingResourceError){
            res.send(error);
            res.status(404);
        }
    }
});


// - GET /expenses/:id
app.get("/expenses/:id", async (req, res) => {
    try {
        const expensesId = Number(req.params.id);
        const expenses:Expenses = await expensesService.retrieveExpenseById(expensesId);
        res.send(expenses);
    } catch (error){
        if (error instanceof MissingResourceError){
            res.send(error);
            res.status(404);
        }
    }
});


// - POST /expenses
app.post("/weddings/:id/expenses", async (req, res) =>{
    try {
        const weddingId = Number(req.params.id);
        const exp:Expenses = req.body;
        exp.weddingId = weddingId;
        const newExp:Expenses = await expensesService.registerExpenses(exp, weddingId);
        res.send(newExp);
        res.status(201);
    } catch (error){
        if (error instanceof MissingResourceError){
            res.send(error);
            res.status(404);
        }
    }
});


// - PUT /expenses/:id
app.put("/expenses/:id", async (req, res)=>{
    try {
        const expensesId = Number(req.params.id);
        const newExp:Expenses = req.body;
        await expensesService.updateExpense(newExp);
        res.send(newExp);
        res.status(200);
    } catch (error){
        if (error instanceof MissingResourceError){
            res.send(error);
            res.status(404);
        }
    }
});


// - DELETE /expenses/:id
app.delete("/expenses/:id", async (req, res)=>{
    try {
        const expensesId = Number(req.params.id);
        await expensesService.removeExpenseById(expensesId);
        res.status(200);
        res.send(`${expensesId} has been deleted.`);
    } catch (error) {
        if (error instanceof MissingResourceError){
            res.status(404);
            res.send(error);
        }
    }
});


// - PATCH /weddings/:id
app.patch("/weddings/:id", async (req, res)=>{
    let wedExpsArr = [];
    const wedId = Number(req.params.id);
    let wed:Wedding = await weddingService.retrieveWeddingById(wedId);
    let wedExps:Expenses[] = await expensesService.retrieveAllExpenses();
    // let j;
    try {
        
        // wed.weddingBudget = wed.weddingBudget - wedExps.expenseAmount;
        for (let i = 0; i < wedExps.length; i++){
            if (wedExps[i].weddingId === wedId){
                wedExpsArr.push(wedExps[i]);
            }
        }
        for (let j = 0; j < wedExpsArr.length; j++){
            await weddingService.withdrawFromBudget(wed, wedExps[j]);
        }
        res.send(wed);
    } catch (error){
        if (error instanceof MissingResourceError){
            res.status(404);
            res.send(error);
        } 
        // else if (OverdrawnError){
        //     if (wed.weddingBudget < wedExps[j].expenseAmount){
        //         res.status(422);
        //         res.send("Exceeds Budget!");
        //     }
        // }
    }
});

app.listen(process.env.PORT || 3004, ()=>{
    console.log("Application Started!")
});