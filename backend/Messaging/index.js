const express = require('express');
const cors = require('cors');
const axios = require('axios');
const {Datastore} = require('@google-cloud/datastore');
// const UnauthorizedError = require('./errors/unauthorized');

const datastore = new Datastore();
const app = express();
app.use(cors());
app.use(express.json());

const transactionHistory = []

// https://renwick-wedding-app.ue.r.appspot.com
// https://authorization-service-dot-renwick-wedding-app.ue.r.appspot.com

app.get('/messages', async(req, res)=>{
    
    if (req.query.sender && req.query.recipient){
        const query = datastore.createQuery('Message').filter('sender', '=', req.query.sender).filter('recipient', '=', req.query.recipient);
        const [data, metaInfo] = await datastore.runQuery(query);
        res.send(data);
    }
    else if (req.query.recipient){
        const query = datastore.createQuery('Message').filter('recipient', '=', req.query.recipient);
        const [data, metaInfo] = await datastore.runQuery(query);
        res.send(data);
    } 
    else if (req.query.sender){
        const query = datastore.createQuery('Message').filter('sender', '=', req.query.sender);
        const [data, metaInfo] = await datastore.runQuery(query);
        res.send(data);
    } else {
        const query = datastore.createQuery('Message');
        const [data, metaInfo] = await datastore.runQuery(query);
        res.send(data);
    }
});


app.get('/messages/:mid', async(req, res)=>{
    const key = datastore.key(['Message', Number(req.params.mid)]);
    const response = await datastore.get(key);
    res.send(response[0]);
});


app.post('/messages', async(req, res)=>{

    const key = datastore.key('Message');

    const newNote = {
        note: req.body.note,
        sender: req.body.sender,
        recipient: req.body.recipient,
    }

    const response = await axios.get(`https://authorization-service-dot-renwick-wedding-app.ue.r.appspot.com/employees/${newNote.sender}/verify`);
    const response2 = await axios.get(`https://authorization-service-dot-renwick-wedding-app.ue.r.appspot.com/employees/${newNote.recipient}/verify`);

    // if (sender != employee || recipient != employee2){
    //     throw new UnauthorizedError('User not in Database');
    // }

    const response3 = await datastore.save({key: key, data: newNote});
    transactionHistory.push(newNote);
    res.send(newNote);
});


app.get('/history', async (req,res)=>{
    res.send(transactionHistory)
});


const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=>console.log('Application started!'));


// - Service for employees to message each other
// - does not have architecture-adherance requirements
// - Routes
//     - GET /messages
//     - GET /messages/:mid
//     - GET /messages?recipient=someone
//     - GET /messages?sender=someone
//     - GET /messages?sender=someone&recipient=someoneelse
//         - Should return messages where both conditions are met
//     - POST /messages
//         - Request Body {"sender": "bill@wed.com", "recipient": "jane@wed.com", "note":"great job"}
// - The service should add a timestamp property to the message when you create a message
// - The service should make a request to the Authorization Service to verify both emails are valid before saving the information.
// - Data should be saved to a NoSQL **Datastore** database
// - This service should be hosted on **App Engine**


// app.get('/messages?sender', async(req, res)=>{

//     const note = req.body;
// });

// app.get('/messages?recipient', async(req, res)=>{

//     const note = req.body;
// });

// app.get('/messages?sender&recipient', async(req, res)=>{

//     const note = req.body;
// });