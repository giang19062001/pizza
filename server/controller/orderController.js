const {Order}  = require('../modules/module')
const orderController ={
    addOrder : async(req,res)=>{
        try {
            const newOrder = new Order(req.body);
            const saveOrder = await newOrder.save();
            res.status(200).json(saveOrder);
            
        } catch (error) {
            res.status(500).json(error) //500 là lỗi server
        } 
    },
    getOrder : async(req,res)=>{
        try {
            const order = await Order.find();
            res.status(200).json(order);
            
        } catch (error) {
            res.status(500).json(error) //500 là lỗi server
        } 
    },
    getOrderDetail : async(req,res)=>{
        try {
            const order = await Order.findById(req.params.id);
            res.status(200).json(order);
            
        } catch (error) {
            res.status(500).json(error) //500 là lỗi server
        } 
    },
}
module.exports = orderController