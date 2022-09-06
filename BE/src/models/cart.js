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

const Carts = mongoose.model("Cart", CartSchema);

 export default Carts;