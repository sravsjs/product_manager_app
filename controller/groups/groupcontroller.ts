import { error, group } from "console";
import { Request,Response } from "express";
import { validationResult } from "express-validator";
import { IGroup } from "../../Models/IGroup";
import {v4} from "uuid";
import { groupDButil } from "../../Util/groupDButil";

export const createGroup=async(request:Request,response:Response)=>{
    try{

       

        //read the form data
        const{name}=request.body
        const newGroup:IGroup={
            id:v4(),
            name:name
        }
        const allgroups:IGroup[] = await groupDButil.readAllgroups();
        allgroups.push(newGroup);
        const isSaved:boolean = await groupDButil.writeAllgroups(allgroups);
            if(isSaved){
                return response.status(404).json(newGroup)
            }
    }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
export const getAllGroups=async(request:Request,response:Response)=>{
    try{

    const allgroups:IGroup[]= await groupDButil.readAllgroups()
        return response.status(404).json(allgroups)
            
    }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
export const getAGroup=async(request:Request,response:Response)=>{
    try{
            const {groupId}=request.params;
                if(groupId){
                    const group:IGroup|undefined= await groupDButil.readAGgroup(groupId)
                        if(group){
                            return response.status(404).json(group)
                        }
                        else{
                            return response.status(500).json({msg:"No item found"})
                        }
                }
          
    }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}