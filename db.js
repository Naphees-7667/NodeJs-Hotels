const mongoose = require('mongoose');
require('dotenv').config();

// const mongodbURL = process.env.mongodbURL;
const mongodbURL = 'mongodb://127.0.0.1:27017/ResturentDB';
mongoose.connect(mongodbURL);

const db = mongoose.connection; 

db.on('connected',()=>{
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
})

db.on('error',(err)=>{
    console.log('MongoDB Connection failed',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB Disconnected');
})

//export the databse connection
module.exports = db