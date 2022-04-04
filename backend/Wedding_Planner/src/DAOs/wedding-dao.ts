import { Wedding } from '../entities'

export interface WeddingDAO{

    //CREATE
    createWedding(wedding:Wedding):Promise<Wedding>;

    //READ
    getWeddingById(weddingId:number):Promise<Wedding>;
    getAllWeddings():Promise<Wedding[]>;

    // PUT
    updateWedding(wedding:Wedding):Promise<Wedding>;

    // DELETE
    deleteWeddingById(weddingId:number): Promise<boolean>;
}