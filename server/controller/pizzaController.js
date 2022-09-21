const {Pizza}  = require('../modules/module')

const pizzaController = {
    addPizza : async(req,res) =>{
        try {
            const name = req.body.name;
            const price = req.body.price;
            const photo = req.file.filename
            const objPizza = {
                name,
                price,
                photo
            }
           const newPizza = new Pizza(objPizza)
           const savePizza = await newPizza.save()
           res.status(200).json(savePizza)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getPizza: async(req,res) =>{
        try {
            const pizza = await Pizza.find()
            res.status(200).json(pizza)
        } catch (error) {
            res.status(500).json(error)

        }
    },
    getPizzaDetail: async(req,res) =>{
        try {
            const pizza = await Pizza.findById(req.params.id)
            res.status(200).json(pizza)
        } catch (error) {
            res.status(500).json(error)

        }
    },
    updatePizza : async(req,res) =>{
        try {
           const pizza = await Pizza.findById(req.params.id) 
           await pizza.updateOne({$set:req.body})
           const updatePizza = await Pizza.findById(req.params.id) 
  
           res.status(200).json(updatePizza);
        } catch (error) {
         res.status(500).json(error)
  
        }
      },
}
module.exports = pizzaController