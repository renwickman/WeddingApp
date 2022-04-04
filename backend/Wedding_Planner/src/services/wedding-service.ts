import { Expenses, Wedding } from '../entities';

export default interface WeddingService {

    registerWedding(wedding:Wedding):Promise<Wedding>;

    retrieveAllWeddings():Promise<Wedding[]>

    retrieveWeddingById(weddingId:number):Promise<Wedding>;

    withdrawFromBudget(wedding:Wedding , expense:Expenses):Promise<Wedding>;

    updateWedding(wedding:Wedding):Promise<Wedding>;
    
    removeWeddingById(weddingId:number):Promise<boolean>;
}