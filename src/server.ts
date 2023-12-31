import express from "express"
import router from "./router";
import morgan from "morgan"
import cors from "cors"
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";


const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json({}))
app.use(express.urlencoded({ extended: true}))


app.use("/api", protect, router)
app.post("/user", createNewUser)
app.post("/signin", signin )
app.get("/", (req, res) =>{
    // console.log("hello from express");
    // res.status(200)
    res.json({message:"hello"})
  
})

app.use((err,req, res, next) =>{
    console.log(err);
    res.json({ message: `Had an error ${err.message}` })
    
    if(err.type === "auth"){
        res.status(401).json({message: "unauthorized"})
    } else if(err.type === 'input'){
        res.status(400).json({message: "Invalid input"})
    } else {
        res.status(500).json({message: "OOPS! That's on us"})
    }
})



export default app