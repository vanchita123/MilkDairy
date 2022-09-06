import Product from "../../Models/Product.js";

export default {
    Query : {
        getProducts: async () => {
            const products = await Product.find()
            // console.log(products);
            return products;
        },
        // ****** Get Only One Product ******
        getProduct: async (root, args) => {
            const product = await Product.findById(args.id)
            return product;
        }
    },
    Mutation: {
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
        }
    }
};
