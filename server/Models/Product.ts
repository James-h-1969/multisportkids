import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: Number,
    name: String,
})

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;