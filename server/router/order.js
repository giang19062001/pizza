const orderController = require('../controller/orderController')
const router = require("express").Router()


router.post("/",orderController.addOrder)
router.get("/",orderController.getOrder)
router.get("/:id",orderController.getOrderDetail)


module.exports = router