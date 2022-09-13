import Carts from "../../Models/Cart.js";

export default  {
    Query: {
        getCarts: async () => {
            const cartItems = await Carts.find()
            // console.log(cartItems);
            return cartItems;;
        },

        getCart: async (root, args) => {
            const cartItem = await Carts.findById(args.id)
            // console.log(cartItem);
            return cartItem;
        },
    },
    Mutation: {
        addToCarts: async (root, args) => {
            const newToCart = new Carts({
                ProductName: args.ProductName,
                ProductWeight: args.ProductWeight,
                ProductQty: args.ProductQty || 1,
                ProductPrice: args.ProductPrice,
                ProductImage: args.ProductImage,
                TotalPrice: args.TotalPrice
            })
            // return newToCart.save();
            return newToCart.save();
        },
        deleteToCarts: async (root, args) => {
            await Carts.findById(args.id)

            await Carts.findByIdAndDelete(args.id)
            return "Product deleted from cart to successfully";
        }
    }
};