const mongoose = require("mongoose")

const pizzaSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    display:{
        type:Boolean,
        default:true
    }
})
const orderSchema = mongoose.Schema({
    name : {
        type:String,
    },
    phone : {
        type:String,
    },
    address : {
        type:String,
    },
    note:{
        type:String
    },
    orderDetail:{
       type:Array,
    },
    total:{
        type:Number
    },
    ship:{
        type:Number
    },
    sumPrice:{
        type:Number
    }
},{timestamps:true})


let Order = mongoose.model("Order",orderSchema)
let Pizza  = mongoose.model("Pizza",pizzaSchema)

module.exports = {Pizza,Order}