const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['Sweet','Salty','Spicy','Sour','Bitter'],
        required:true
    },
    is_drink:{
        type:Boolean,
        required:true,
        default:false
    },
    ingredients:{
        type:[String],
        enum:['Veg','Non-Veg','Egg','Fish','Meat','Milk','Cheese','Soya','Wheat','Rice','Other'],
        required:true,
        default:['none']
    },
    num_sales:{
        type:Number,
        required:true
    }
})

const menuItem = mongoose.model('menuItem',menuItemSchema);

module.exports = menuItem