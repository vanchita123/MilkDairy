import { gql } from "apollo-server-express";

export default gql`
    type Products {
        id: ID
        ProductName: String
        ProductWeight: Number
        ProductPrice: Number
        ProductDetail: String
        ProductManuf:Date
        ProductExp: Date
        ProductImage: String
    }

    type Query {
        getProducts: [Products]
        getProduct(id:ID):Products
    }

    type Mutation {
        addProducts(
            ProductName: String
            ProductWeight: Number 
            ProductPrice: Number
            ProductDetail: String
            ProductManuf: Date
            ProductExp: Date   
            ProductImage: String
        ): Products

        deleteProducts(id:ID):String

        updateProducts(
            id:ID 
            ProductName: String 
            ProductWeight: Number 
            ProductPrice: Number 
            ProductDetail: String 
            ProductManuf: Date
            ProductExp: Date
            ProductImage: String
        ):Products 
    }
`;

