import Product from "../models/Product.js";
import mongoose from "mongoose";

//to get single product
export const getProduct = async (req,res) =>{
   const { id } = req.params
   
    try{
         //check if product exists
        if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("product not found");

        const product = await Product.findById(id);
 
        res.status(200).json(product);
    }
    catch(err){
        res.status(404).json({ message: err});
    }
}

//to get all products 
export const getProducts = async (req,res) =>{
    try{
        const product = await Product.find();
        res.status(200).json(product);
    } catch(err){
        res.status(404).json({ message: err});
    }
}

//to create product
export const createProduct = async (req,res) =>{
 
    const {title, desc, price} = req.body;
    console.log(title,desc,price);
    const product = new Product({
        title,
         desc,
         price
    });
   
    try{
        const savedProduct = await product.save()

        res.json(savedProduct);
    }
    catch(err) {
        res.json({message: err});
    }
}

//to update product
export const updateProduct = async (req,res) =>{
     console.log("We are here")
    const {id} = req.params;
    const {title, desc, price} = req.body;
    console.log(title, desc, price);

    try{
         //check if product exists
         if (!mongoose.Types.ObjectId.isValid(id))
         return res.status(404).send("product not found");
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { id, title,desc,price },
        { new: true }
      );
    res.json({message: "product successfully updated"});
} catch(err){
    res.json({message: err});
}}

//to delete product
export const deleteProduct = async (req,res) =>{
    const {id} = req.params;
    try{
         //check if product exists
         if (!mongoose.Types.ObjectId.isValid(id))
         return res.status(404).send("product not found");
        const removedProduct = await Product.deleteOne({ id});
        res.json({message: "product successfully deleted"});
    } catch(err){
        res.json({message: err});
    }
}
 