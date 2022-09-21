const express = require("express")
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")


dotenv.config()
const http  = require("http")
const server = http.createServer(app)
const socketIo = require("socket.io")(server,{
    cors:{
        origin: "*"
    }
})
socketIo.on("connection", (socket) => { 
    socket.on("notification", (dataOrder) => { 
         socket.local.emit("getNotification",dataOrder)
   }),
   socket.on("disconnect", () => {
    console.log("Client disconnected"); 
  })
})

//import router
const pizzaRouter = require("./router/pizza")
const orderRouter = require("./router/order")



mongoose.connect((process.env.MONGODB_URL),()=> {console.log("connected to mongodb") })


app.use(cors()) 
app.use (bodyParser.json()) 
app.use(morgan("common"))
app.use(express.static('images')); 

//use router
app.use("/api/pizza",pizzaRouter)
app.use("/api/order",orderRouter)


server.listen(8000,() =>{
    console.log("server is running...")
})
