const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    fullname: String,
    email: String,
    address: String,
    city: String,
    postcode: String,
    nameOnCard: String,
    cardnumber: Number,
    expmonth: Number,
    expyear: Number,
    ccv: Number,
    products: [ { productId: Number, productName: String, price: Number } ],
    sameAsShippingAddress: Boolean,
    total: Number
})

const Transaction = mongoose.model('Transaction', TransactionSchema);

// Router Home
Router.get('/', (req, res)=>{
    res.send("Welcome to TradesTeam Checkout Server, developed by Abel Akponine &copy; 2024");
});

// checkout endpoint
Router.post('/checkout', (req, res)=>{
    
    try {
        req.body.products = JSON.parse(req.body.products);
        req.body.sameAsShippingAddress = req.body.sameAsShippingAddress ? true : false;

        let transaction = new Transaction(req.body);

        // save transaction to database
        transaction.save().then((txn) =>{
            
            console.log('Transaction Saved!', txn);

            res.json({
                status: 'success',
                transactionId: txn._id,
                message: 'Transaction saved!'
            });
        }).catch(err =>{
            res.json({
                status: 'failed',
                message: err
            });
        });
    
    } catch (err) {
        console.error('Error processing request:', err);
        res.status(400).json({
            status: 'failed',
            message: 'Bad Request',
            errorMessage: err
        });
    }
});

Router.get('/cleandb', (req, res)=>{
    mongoose.connection.db.collections().then(async (transactions)=>{
        for (let txn of transactions){
            await txn.drop()
        }
        res.send('All Transactions Cleared!');
    }).catch(err=>console.log(err));
})
module.exports = Router;