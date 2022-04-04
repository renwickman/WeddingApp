"use strict";
exports.__esModule = true;
exports.runner = void 0;
var pg_1 = require("pg");
require('dotenv').config({ path: 'C:\\Users\\renwi\\Desktop\\Revature_Learning\\WeddingApp\\backend\\Wedding_Planner\\app.env' });
exports.runner = new pg_1.Client({
    user: 'postgres',
    password: process.env.DBPASSWORD,
    database: process.env.DATABASENAME,
    port: 5432,
    host: '35.193.197.146'
});
exports.runner.connect();
