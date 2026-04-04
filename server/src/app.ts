import express, { Application } from "express"
import userRouter from "./modules/auth/auth.routes"
import { errorMiddleware } from "./middlewares/error.middleware";


const app:Application = express();

app.use(express.json());

//health check route(always up)
app.get("/", (req,res)=>{
    res.send("HEALTH CHECK: OK")
})

app.use("/api/v1/users", userRouter)

app.use(errorMiddleware)
export {app};