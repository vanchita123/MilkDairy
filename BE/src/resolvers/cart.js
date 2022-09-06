import Cart from "../../Models/Cart";

export default  {
    Query: {
        getCarts: async () => {
            const cartItems = await Cart.find()
            // console.log(cartItems);
            return cartItems;;
        },

        getCart: async (root, args) => {
            const cartItem = await Cart.findById(args.id)
            // console.log(cartItem);
            return cartItem;
        },
    },
    Mutation: {
        addToCarts: async (root, args) => {
            const newToCart = new Cart({
                ProductName: args.ProductName,
                ProductWeight: args.ProductWeight,
                ProductPrice: args.ProductPrice,
                ProductImage: args.ProductImage
                // TotalPrice: args.TotalPrice
            })
            // return newToCart.save();
            return newToCart.save();
        },
        deleteToCarts: async (root, args) => {
            await Cart.findById(args.id)

            await Cart.findByIdAndDelete(args.id)
            return "Product deleted from cart to successfully";
        }
    }
};