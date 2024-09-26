const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define Transaction Schema with validation and types
const TransactionSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Shipping address is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    postcode: {
        type: String,
        required: [true, 'Postcode is required'],
        minlength: [5, 'Postcode must be at least 5 characters long'],
    },
    nameOnCard: {
        type: String,
        required: [true, 'Name on card is required'],
    },
    cardnumber: {
        type: Number,
        required: [true, 'Card number is required'],
        min: [1000000000000000, 'Card number must be at least 16 digits'],
        max: [9999999999999999, 'Card number cannot exceed 16 digits'],
    },
    expmonth: {
        type: Number,
        required: [true, 'Expiration month is required'],
        min: 1,
        max: 12,
    },
    expyear: {
        type: Number,
        required: [true, 'Expiration year is required'],
        min: new Date().getFullYear(),
    },
    ccv: {
        type: Number,
        required: [true, 'CCV is required'],
        minlength: 3,
        maxlength: 4,
    },
    products: [{
        productId: {
            type: Number,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    sameAsShippingAddress: {
        type: Boolean,
        default: false,
    },
    total: {
        type: Number,
        required: [true, 'Total amount is required'],
    }
});

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