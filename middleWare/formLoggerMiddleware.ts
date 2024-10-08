import { Request,Response,NextFunction } from "express";

import { validationResult} from "express-validator";

export const formLoggerMiddleWare=(request:Request,response:Response,next:NextFunction)=>{
    const result= validationResult(request);
            if(!result.isEmpty()){
                return response.status(401).json({errors:result.array()})
            }
            next();
}