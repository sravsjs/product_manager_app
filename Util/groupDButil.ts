import path from "path";
import { IProduct } from "../Models/IProduct";
import jsonfile from "jsonfile";
import { IGroup } from "../Models/IGroup";

export class groupDButil{
      private static filepath =path.join(process.cwd(),"database","groups.json")

            public static readAllgroups():Promise<IGroup[]>{
                return new Promise((resolve, reject) => {
                            jsonfile.readFile(this.filepath,(err,data)=>{
                                        if(err){
                                            reject(err);
                                        }
                                        else{
                                            resolve(data);
                                        }
                            })
                })
            }
            public static writeAllgroups(groups:IGroup[]):Promise<boolean>{
                return new Promise((resolve, reject) => {
                            jsonfile.writeFile(this.filepath,groups,(err)=>{
                                        if(err){
                                            reject(false);
                                        }
                                        else{
                                            resolve(true);
                                        }
                            })
                })
            }
            public static readAGgroup(groupId:string):Promise<IGroup|undefined>{
                return new Promise((resolve, reject) => {
                            jsonfile.readFile(this.filepath,(err,data)=>{
                                        if(err){
                                            reject(err);
                                        }
                                        else{
                                            const groupList:IGroup[]=data;
                                            const group:IGroup|undefined=groupList.find(item=>item.id === groupId)
                                            resolve(group)
                                        }
                            })
                })
            }
            
}
