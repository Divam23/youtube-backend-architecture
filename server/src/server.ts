import { configDotenv } from "dotenv";
import {app} from "./app"

configDotenv();

const PORT = process.env.PORT;


app.listen(PORT, ()=>{
    console.log(`SERVER STARTED ON http://localhost:${PORT}`);
})