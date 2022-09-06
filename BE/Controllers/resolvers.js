import { ApolloError } from "apollo-server-express";
// import { PubSub } from "graphql-subscriptions";
import Product from "../Models/Product.js";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cart from "../Models/Cart.js";

// const pubSub = new PubSub();

const resolvers = {
    Query: {

        // ****** Product Start ******
        // ****** Get Products ******
        getProducts: async () => {
            const products = await Product.find()
            // console.log(products);
            return products;
        },
        // ****** Get Only One Product ******
        getProduct: async (root, args) => {
            const product = await Product.findById(args.id)
            return product;
        },
        //    ****** Product End ******

        //  ****** Cart Start ******
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
        // ****** Cart End ******

        // ****** User Start ******
        // ****** Get Multiple Users  ******
        Users: async () => {
            const users = await User.find();
            return users;
        },

        getUser: async (root, args) => {
            const user = await User.findById(args.id)
            return user;
        },
        // ******== User End ******

    },
    Mutation: {

        //  ****** Product Start ******
        // ****** Add Product ******
        addProducts: async (root, args) => {
            const newProduct = new Product({
                ProductName: args.ProductName,
                ProductWeight: args.ProductWeight,
                ProductPrice: args.ProductPrice,
                ProductDetail: args.ProductDetail,
                ProductManuf: args.ProductManuf,
                ProductExp: args.ProductExp,
                ProductImage: args.ProductImage
            });
            const res = await newProduct.save();            
            return {
                id: res.id,
                ...res._doc
            };
        },
        
        //  ****** Delete Product ******       
        deleteProducts: async (root, args) => {
            await Product.findById(args.id)

            await Product.findByIdAndDelete(args.id)
            return "Product deleted successfully";
        },
        // ****** Update Product ******
        updateProducts: async (root, args) => {
            const { id, ProductName, ProductWeight, ProductPrice, ProductDetail, ProductManuf, ProductExp, 
            ProductImage } = args;
            const updateProduct = {}
            updateProduct.ProductName = ProductName
            updateProduct.ProductWeight = ProductWeight
            updateProduct.ProductPrice = ProductPrice
            updateProduct.ProductDetail = ProductDetail
            updateProduct.ProductManuf = ProductManuf
            updateProduct.ProductExp = ProductExp
            updateProduct.ProductImage = ProductImage
            
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                updateProduct,
                // { new: true }
            )
            // console.log(updatedProduct);
            return updatedProduct;
        },
        //  ****** Product End ******

        //  ****** Cart Start ******

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
        },
        // ****** Cart End ******


        //  ****** User Start ******

        async registerUser(_, { registerInput: { UserName, UserEmail, UserPhone, UserPassword, UserConfirmPassword } }) {
            //see olderuser exists

            const oldUser = await User.findOne({ UserEmail });
            if (oldUser) {
                throw new ApolloError('user alerady exit' + UserEmail + 'USER_ALREADY_EXISTS')
            }

            //encrypt password

            var encryptedPassword = await bcrypt.hash(UserPassword, 10);

            //build out mongoose model(user)

            const newUser = new User({
                UserName: UserName,
                UserEmail: UserEmail.toLowerCase(),
                UserPhone: UserPhone,
                UserPassword: encryptedPassword,
                UserConfirmPassword: encryptedPassword
            });
            // console.log(newUser);

            // create out JWT

            const token = jwt.sign(
                { user_id: newUser._id, UserEmail },
                "UNSAFE_STRING", {
                expiresIn: "48h"
            }
            );
            newUser.token = token;
            // console.log(token);

            const res = await newUser.save();
            // console.log(res);
            return {
                id: res.id,
                ...res._doc
            }
        },
        async loginUser(_, { loginInput: { UserEmail, UserPassword } }) {

            const user = await User.findOne({ UserEmail });
            if (user && (bcrypt.compare(UserPassword, user.UserPassword))) {
                const token = jwt.sign(
                    { user_id: user._id, UserEmail },
                    "UNSAFE_STRING", {
                    expiresIn: "2h"
                }
                );

                user.token = token;
                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                throw new ApolloError('Incorrect Error', 'INCORRECT_PASSWORD')
            }

        },
        deleteUser: async (root, args) => {
            await User.findById(args.id)

            await User.findByIdAndDelete(args.id)
            return "User deleted successfully";
        },

        //  ****** User End ******
        // singleUpload: (parent, args) => {
        //     console.log(args);
        //     return "Success";
        // },
    },
    // Subscription: {
    //     ProductsAdded: {
    //         subscribe: () => pubSub.asyncIterator("Carts")
    //     }
    // }
};

export default resolvers;

// addProducts: async (root, args) => { //return promise
//     // args?.image
//     let newProduct = {
//         Products_name: args.Products_name,
//         Products_date_manufacture: args.Products_date_manufacture,
//         Products_date_expiry: args.Products_date_expiry,
//         Products_Price: args.Products_Price,
//         Products_Image: args.Products_Image
//     }
//     if(args?.image){
//         let base64String = args?.image;
//         let base64Image = base64String.split(';base64,').pop();
//         const imgName = `${+new Date}.png`;
//         console.log("imgName",imgName)
//         fs.writeFileSync(`/Users/imac/Documents/bakery/server/ASSETS/${imgName}`, base64Image, { encoding: 'base64' });
//         newProduct.image  = imgName
//     }
//     const addedProduct = await Products.create(newProduct) //make promise
//     return addedProduct;
// },
// addImage: async (root, args) => {
//     let base64String = args?.image;
//     let base64Image = base64String.split(';base64,').pop();
//     const imgName = `${+new Date}.png`;
//     fs.writeFileSync(`/Users/imac/Documents/bakery/server/ASSETS/${imgName}`, base64Image, { encoding: 'base64' });
//     // inputPost["encodedImage"] = imgName;
//     return "Hello"
// },

// singleUpload: (parent, args) => {
//     console.log(args);
//     return "Success";
// },