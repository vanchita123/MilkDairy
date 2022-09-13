import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        require: true 
    },
    ProductWeight: Number,
    ProductQty: Number,
    ProductPrice: Number,
    ProductImage: String,
    TotalPrice: Number
}, { timestamps: true });

export default mongoose.model("Cart", CartSchema);