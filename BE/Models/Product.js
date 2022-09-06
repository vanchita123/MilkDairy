import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        require: true
    },
    ProductWeight: Number,
    ProductPrice: Number,
    ProductDetail: String,
    ProductManuf: {type: Date, require: true},
    ProductExp: {type: Date, require: true},
    ProductImage: String
},{timestamps: true});
// console.log(ProductSchema);


export default mongoose.model("Product", ProductSchema);