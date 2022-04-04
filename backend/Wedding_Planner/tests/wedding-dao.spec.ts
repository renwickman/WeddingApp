import { WeddingDAO } from "../src/DAOs/wedding-dao";
import { Wedding } from "../src/entities";
import { runner } from "../src/connection";
import { WeddingDaoPostgres } from "../src/DAOs/wedding-dao-postgres";

let date: Date = new Date("12-12-2021");
let date2: Date = new Date("11-20-2021");
const weddingDAO:WeddingDAO = new WeddingDaoPostgres();
const testWedding:Wedding = new Wedding(0, 'Eddie', 'Jackie', 'Austin, TX', 10000, date);
const testWedding2:Wedding = new Wedding(0, 'Melvin', 'Jane', 'San Antonio, TX', 20000, date2);

test("Create a wedding", async () =>{
    const result:Wedding = await weddingDAO.createWedding(testWedding);
    expect(result.weddingId).not.toBe(0);
});

test("Get wedding by Id", async ()=>{
    let myWedding:Wedding = new Wedding(0, 'Melvin', 'Jane', 'San Antonio, TX', 20000, date2);
    myWedding = await weddingDAO.createWedding(myWedding);

    let returnedWedding:Wedding = await weddingDAO.getWeddingById(myWedding.weddingId);

    expect(returnedWedding.groomName).toBe(myWedding.groomName);
});

test("Get all weddings", async ()=>{
    let wedding1:Wedding = new Wedding(0, 'Oscar', 'Jane', 'San Antonio, TX', 20000, date2);
    let wedding2:Wedding = new Wedding(0, 'Luke', 'Jane', 'San Antonio, TX', 30000, date2);
    let wedding3:Wedding = new Wedding(0, 'Larry', 'Jane', 'San Antonio, TX', 40000, date2);
    let wedding4:Wedding = new Wedding(0, 'Kevin', 'Jane', 'San Antonio, TX', 50000, date2);
    await weddingDAO.createWedding(wedding1);
    await weddingDAO.createWedding(wedding2);
    await weddingDAO.createWedding(wedding3);
    await weddingDAO.createWedding(wedding4);

    const weddings:Wedding[] = await weddingDAO.getAllWeddings();

    expect(weddings.length).toBeGreaterThanOrEqual(4);
});

test("Update wedding", async() => {
    let targetedWedding:Wedding = new Wedding(0, 'Melvin', 'Jane', 'San Antonio, TX', 20000, date2);
    targetedWedding = await weddingDAO.createWedding(targetedWedding);
    targetedWedding.brideName = 'Mary';

    targetedWedding = await weddingDAO.updateWedding(targetedWedding);

    expect(targetedWedding.brideName).toBe('Mary');
});


test("Delete wedding by id", async() => {
    let targetedWedding:Wedding = new Wedding(0, 'Marty', 'Julie', 'San Antonio, TX', 20000, date);
    targetedWedding = await weddingDAO.createWedding(targetedWedding);

    const result:boolean = await weddingDAO.deleteWeddingById(targetedWedding.weddingId);
    expect(result).toBeTruthy();
});


afterAll(async()=>{
    runner.end()
});