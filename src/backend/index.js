const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');

dotenv.config();
const routers = require(`./api/${process.env.API_VERSION}/routers`);

/** CORS */
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];

app.use((req, res, next)=>{
    originIndex = allowedOrigins.indexOf(req.headers.origin);
    res.header("Access-Control-Allow-Origin", allowedOrigins[originIndex]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());


// Routers
app.use('/', routers)

// MongoDB Database
const mongoose = require('mongoose');
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.pecns.mongodb.net/transactions?retryWrites=true&w=majority`)

mongoose.connection.once('open', (error)=>{
    if (!error){
        console.log('Database conneted!!');
    }
    else (
        console.log(error)
    )
});

// Run server
let SERVER_PORT = process.env.PORT || 5000;

server.listen(SERVER_PORT, (err)=>{
    if (err) console.log(err)
    else console.log('Server started at ', SERVER_PORT)
});