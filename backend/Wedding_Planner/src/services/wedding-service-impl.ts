import { MissingResourceError, OverdrawnError } from "../errors";
import { WeddingDAO } from "../DAOs/wedding-dao";
import { WeddingDaoPostgres } from "../DAOs/wedding-dao-postgres";
import { Expenses, Wedding } from "../entities";
import WeddingService from "./wedding-service";

export class WeddingServiceImpl implements WeddingService{

    weddingDao:WeddingDAO = new WeddingDaoPostgres();

    registerWedding(wedding: Wedding): Promise<Wedding> {
        return this.weddingDao.createWedding(wedding);
    }
    retrieveAllWeddings(): Promise<Wedding[]> {
        return this.weddingDao.getAllWeddings();
    }
    retrieveWeddingById(weddingId: number): Promise<Wedding> {
        return this.weddingDao.getWeddingById(weddingId);
    }

    withdrawFromBudget(wedding: Wedding, expense: Expenses): Promise<Wedding> {
        wedding.weddingBudget = wedding.weddingBudget - expense.expenseAmount;
        if (expense.expenseAmount > wedding.weddingBudget){
            throw new OverdrawnError("Insufficient Funds");
        }
        return this.weddingDao.getWeddingById(wedding.weddingId);
    }
    
    updateWedding(wedding: Wedding): Promise<Wedding> {
        return this.weddingDao.updateWedding(wedding);
    }

    removeWeddingById(weddingId: number): Promise<boolean> {
        if (this.weddingDao.getWeddingById(weddingId) === null){
            throw new MissingResourceError("Wedding not found.");
        }
        return this.weddingDao.deleteWeddingById(weddingId);
    }
    
}