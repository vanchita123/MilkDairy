import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        require: true 
    },
    ProductWeight: Number,
    ProductPrice: Number,
    ProductImage: String,
}, { timestamps: true });

export default mongoose.model("Cart", CartSchema);