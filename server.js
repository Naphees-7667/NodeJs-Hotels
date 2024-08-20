const express = require('express');
const app = express();
const db = require('./db.js');
const passport = require('./middleware/auth.js');
require("dotenv").config();

const logRequest = require('./middleware/middleware.js');
app.use(logRequest);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person.models.js');
const menuItem = require('./models/menuItem.models.js');

app.use(passport.initialize());

// const authMiddleware = passport.authenticate('local',{
//     session:false
// })

app.get('/',(req,res)=>{
    res.send('Welcome to our hotel');
})

const personRoutes = require('./routes/person.routes.js');
app.use('/person',personRoutes);


const menuItemRoutes = require('./routes/menuItems.routes.js');
app.use('/menu',menuItemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('server is running on port 3000');
})