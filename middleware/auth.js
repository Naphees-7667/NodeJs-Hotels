const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('../models/person.models.js');

passport.use(new LocalStrategy(async (username,password,done) => {
    try{
        //authentication logic here 
        const user = await Person.findOne({username:username});
        if(!user){
            return done(null,false,{
                message:'Incorrect Username'
            })
        }

        const isMatch = await user.isValidPassword(password);
        
        if(! isMatch){
            return done(null,false,{
                message:'Incorrect Password'
            })
        }
        return done(null,user)
    }
    catch(err){
        return done(err)
    }
}))

module.exports = passport