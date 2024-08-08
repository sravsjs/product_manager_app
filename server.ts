import  express,{Request,Response,Application} from "express";
import productRouter from "./routes/productRouter";
import { productDButil } from "./Util/productDButil";
import groupRouter from "./routes/groupRouter";
import dotEnv from "dotenv"
import { loggerMiddleWare } from "./middleWare/loggerMiddleware";

const app:Application=express();

//configure dotenv
dotEnv.config({path:'./.env'})

//configure express to read the form data
app.use(express.json());

//configure the logger middleware
app.use(loggerMiddleWare);



const port:Number|string|undefined =process.env.EXPRESS_PORT ||9999;

app.get("/",(request:Request,response:Response)=>{
    response.status(201);
    response.json({
        msg: "welocme to the express js",
    

    })
})

//configure routes
app.use("/products",productRouter)
app.use("/groups",groupRouter)
if(port){
    app.listen(Number(port),()=>{
        console.log( `express server is running on ${port}`)
     }) 
}
