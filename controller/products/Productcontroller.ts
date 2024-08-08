import { error } from "console";
import { Request,Response } from "express";
import { validationResult } from "express-validator";
import { IProduct } from "../../Models/IProduct";
import {v4} from "uuid";
import { productDButil } from "../../Util/productDButil";

/**
   @usage: to Create a contact
   @method: post
   @params: name,imageUrl,qty,price,groupId
   @url: http://localhost:9000/contacts/
   */

export const createProduct=async(request:Request,response:Response)=>{
    try{

        //read the form data
        const {name,imageurl,price,qty,groupId}=request.body;
          const newproduct:IProduct={
            id:v4(),
            name:name,
            imageurl:imageurl,
            qty:qty,
            price:price,
            groupId:groupId
            }
            const allProducts:IProduct[] = await productDButil.readAllProducts();
            allProducts.push(newproduct);
            const isSaved:boolean = await productDButil.writeAllProducts(allProducts);
                if(isSaved){
                    return response.status(404).json(newproduct)
                }
    }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}

/**
   @usage: to Get all contacts
   @method: GET
   @params: no params
   @url: http://localhost:9000/contacts

   */
   export const getAllProducts=async(request:Request,response:Response)=>{
    try{
        const allProducts:IProduct[] = await productDButil.readAllProducts();
          return response.status(200).json(allProducts)
    }
    catch(error:any){
          return response.status(500).json({errors:[error.message]})
    }
}
 /**
    @usage: to Get a contact
    @method: GET
    @params: no params
    @url: http://localhost:9000/:contactId
    */
export const getAProduct=async(request:Request,response:Response)=>{
    try{
        const {productId}=request.params;
        if(productId){
            const Product:IProduct|undefined = await productDButil.readAProduct(productId)
           if(Product){
            return response.status(200).json(Product)
           }
           else{
             return response.status(200).json({msg:"no item found"})
           }
        }
      
            }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
/**
   @usage: to Update a contact
   @method: put
   @params: name,imageUrl,email,mobile,title,company,groupId
   @url: http://localhost:8000/:contactId
   */
   export const updateAProduct=async(request:Request,response:Response)=>{
    try{
       
        const {productId}=request.params;
        if(productId){
           //read the form data
            const {name,imageurl,price,qty,groupId}=request.body;
            //update the form data
          const newproduct:IProduct={
            id:productId,
            name:name,
            imageurl:imageurl,
            qty:qty,
            price:price,
            groupId:groupId
            }
            const allProducts:IProduct[] = await productDButil.readAllProducts();
            const selectedProduct = allProducts.find(product => productId === product.id)
           if(selectedProduct){
            
            const productIndex = allProducts.indexOf(selectedProduct)
                    if(productIndex !== -1){
                        allProducts.splice(productIndex,1,newproduct) //replace
                            const isSaved:boolean = await productDButil.writeAllProducts(allProducts);
                            if(isSaved){
                                return response.status(404).json(newproduct)
                            }
                    }
           }
           
           }
           else{
             return response.status(200).json({msg:"no item found"})
           }
        }
      
    
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
export const deleteAProduct=async(request:Request,response:Response)=>{
    try{
        const {productId}=request.params;
        if(productId){
            const Product:IProduct|undefined = await productDButil.readAProduct(productId)
           if(Product){
            const allProducts:IProduct[] = await productDButil.readAllProducts();
            const selectedProduct = allProducts.find(product => productId === product.id)
           if(selectedProduct){
            
            const productIndex = allProducts.indexOf(selectedProduct)
                    if(productIndex !== -1){
                        allProducts.splice(productIndex,1) //delete
                            const isSaved:boolean = await productDButil.writeAllProducts(allProducts);
                            if(isSaved){
                                return response.status(404).json({})
                            }
                    }
           }
            return response.status(200).json(Product)
           }
           else{
             return response.status(200).json({msg:"no item found"})
           }
        }
      
            }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
