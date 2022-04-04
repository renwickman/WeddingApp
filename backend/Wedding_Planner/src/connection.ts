import { Client } from 'pg';
require('dotenv').config({path:'C:\\Users\\renwi\\Desktop\\Revature_Learning\\WeddingApp\\backend\\Wedding_Planner\\app.env'});

export const runner = new Client({
    user: 'postgres',
    password: process.env.DBPASSWORD,
    database: process.env.DATABASENAME,
    port:5432,
    host: '35.193.197.146'
});
runner.connect()