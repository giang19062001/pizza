const pizzaController = require("../controller/pizzaController")
const upload = require("../middleware/middlewareImage")
const router = require("express").Router()

router.post("/",upload.single('photo'),pizzaController.addPizza)
router.get("/",pizzaController.getPizza)
router.get("/:id",pizzaController.getPizzaDetail)
router.put("/:id",pizzaController.updatePizza)




module.exports = router