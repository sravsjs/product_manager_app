import path from "path";
import { IProduct } from "../Models/IProduct";
import jsonfile from "jsonfile";

export class productDButil{
      private static filepath =path.join(process.cwd(),"database","products.json")

            public static readAllProducts():Promise<IProduct[]>{
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
            public static writeAllProducts(products:IProduct[]):Promise<boolean>{
                return new Promise((resolve, reject) => {
                            jsonfile.writeFile(this.filepath,products,(err)=>{
                                        if(err){
                                            reject(false);
                                        }
                                        else{
                                            resolve(true);
                                        }
                            })
                })
            }
            public static readAProduct(productId:string):Promise<IProduct|undefined>{
                return new Promise((resolve, reject) => {
                            jsonfile.readFile(this.filepath,(err,data)=>{
                                        if(err){
                                            reject(err);
                                        }
                                        else{
                                            const productList:IProduct[]=data;
                                            const product:IProduct|undefined=productList.find(item=>item.id === productId)
                                            resolve(product)
                                        }
                            })
                })
            }
            
}
