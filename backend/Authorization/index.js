require('dotenv').config();
const { Datastore } = require('@google-cloud/datastore');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('./errors/unauthenticated')

const app = express();
app.use(express.json());
app.use(cors());

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const datastore = new Datastore()

app.get('/employee/:email', async (req, res)=>{
    const key = datastore.key(['Employee', `${req.params.email}`]);
    const response = await datastore.get(key)
    res.send(response[0]);
});

app.get('/employees', async (req, res)=>{
        const query = datastore.createQuery('Employee');
        const [data, metaInfo] = await datastore.runQuery(query);
        res.send(data);
});

app.patch('/employees/login', async(req, res)=>{
    const queryLogin = datastore.createQuery('Employee').filter('email', '=', req.body.email).filter('password', '=', req.body.password);
    const [newData, newMetaInfo] = await datastore.runQuery(queryLogin);
    try {
        if (newData){
            const newToken = generateToken(newData[0].email);
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer')){
                throw new UnauthenticatedError('Authentication Invalid');
            }
            res.send(newToken);
        }
    } catch (error) {
        res.send(error);
        res.status(404);
    }
});

app.get('/employees/:email/verify', async (req, res)=>{
    
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const key = datastore.key(['Employee', req.params.email]);
        console.log(key);
        const employee = await datastore.get(key);
        console.log(employee);
        if (!decoded || !employee){
            throw new Error();
        }
        res.send(employee);
    } catch (error) {
        res.send(error);
        res.status(404);
    }    
});

app.listen(process.env.PORT || 3001, ()=>{
    console.log("Application Started!")
});