const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        enum:['manager','chef','waiter'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
})

personSchema.pre("save", async function (next){
    if(! this.isModified("password")){
        return next()
    }
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    }
    catch(err){
        next(err)
    }
})

personSchema.methods.isValidPassword = async function (password){
    try{
        return await bcrypt.compare(password,this.password)
    }
    catch(err){
        throw err
    }
}

const person = mongoose.model('person',personSchema)
module.exports = person