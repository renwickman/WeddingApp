import { runner } from '../src/connection'

test("Should create a connection ", async ()=>{
    const result = await runner.query("select * from wedding");
});

afterAll(async()=>{
    runner.end()
});