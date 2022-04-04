import { Wedding } from '../entities';
import { WeddingDAO } from './wedding-dao';
import { runner } from '../connection';
import { MissingResourceError } from '../errors';


export class WeddingDaoPostgres implements WeddingDAO{
    
    
    async createWedding(newWedding: Wedding): Promise<Wedding> {
        const sql:string = "insert into wedding(groom_name, bride_name, wedding_location, budget, wedding_date) values ($1,$2,$3,$4,$5) returning wedding_id"
        const values = [newWedding.groomName, newWedding.brideName, newWedding.weddingLocation, newWedding.weddingBudget, newWedding.weddingDate];
        const result = await runner.query(sql, values);
        newWedding.weddingId = result.rows[0].wedding_id;
        return newWedding;
    }
    
    async getAllWeddings(): Promise<Wedding[]> {
        const sql:string = "select * from wedding";
        const result = await runner.query(sql);
        const weddings:Wedding[] = [];
        for (const row of result.rows){
            const newWedding:Wedding = new Wedding(
                row.wedding_id,
                row.groom_name,
                row.bride_name,
                row.wedding_location,
                row.budget,
                row.wedding_date);
            weddings.push(newWedding);
        }
        return weddings;
    }


    async getWeddingById(weddingId: number): Promise<Wedding> {
        const sql:string = "select * from wedding where wedding_id = $1";
        const values = [weddingId];
        const result = await runner.query(sql, values);
        if(result.rowCount === 0){
            throw new MissingResourceError(`The runner with id ${weddingId} does not exist!`);
        }
        const row = result.rows[0];
        const theWedding:Wedding = new Wedding(
           row.wedding_id,
           row.groom_name,
           row.bride_name,
           row.wedding_location,
           row.budget,
           row.wedding_date
        );
        return theWedding;
    }

    async updateWedding(updateWedding: Wedding): Promise<Wedding> {
        const sql:string = 'update wedding set groom_name=$1, bride_name=$2, wedding_location=$3, budget=$4, wedding_date=$5 where wedding_id=$6'
        //need to have values to replace the '$' signs
        const values = [updateWedding.groomName, updateWedding.brideName, updateWedding.weddingLocation, updateWedding.weddingBudget, updateWedding.weddingDate, updateWedding.weddingId];
        const result = await runner.query(sql, values);
        if(result.rowCount === 0){
            throw new MissingResourceError(`The wedding with id ${updateWedding.weddingId} does not exist`);
        }
        return updateWedding;
    }
    
    async deleteWeddingById(weddingId: number): Promise<boolean> {
        const sql:string = 'delete from wedding where wedding_id = $1'
        const values = [weddingId];
        const result = await runner.query(sql, values);
        if (result.rowCount === 0){
            throw new MissingResourceError(`The wedding with id ${weddingId} does not exist`)
        }
        return true;
    }

}
