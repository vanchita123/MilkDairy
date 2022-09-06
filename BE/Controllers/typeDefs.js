import { gql } from "apollo-server-express";


const typeDefs = gql`
    scalar Date
    scalar PhoneNumber
    scalar Number  
    scalar Upload  

    type Products{
        id: ID
        ProductName: String
        ProductWeight: Number
        ProductPrice: Number
        ProductDetail: String
        ProductManuf:Date
        ProductExp: Date
        ProductImage: String
    }

    type Carts{
        id: ID
        ProductName: String
        ProductWeight: Number
        ProductPrice: Number
        ProductImage: String
    }

    type User{
        id: ID,
        UserName: String,
        UserEmail: String,
        UserPhone: PhoneNumber,
        UserPassword: String,
        token: String
    }

   input RegisterInput{
        UserName: String,
        UserEmail: String,
        UserPhone: PhoneNumber,
        UserPassword: String,
        UserConfirmPassword: String,
        token: String
    }

    input LoginInput {
        UserEmail: String,
        UserPassword: String,
    }

    type Query{
        getProducts: [Products],
        getProduct(id:ID):Products,
        
        getCarts: [Carts],
        getCart(id: ID): Carts

        Users:[User],
        getUser(id:ID):User,
    }

    type Mutation{
        addProducts(
            ProductName: String, 
            ProductWeight: Number, 
            ProductPrice: Number,
            ProductDetail: String,
            ProductManuf: Date,
            ProductExp: Date   
            ProductImage: String        
        ):Products,
        addImage(image:String):String

        deleteProducts(id:ID):String,

        updateProducts(
            id:ID, 
            ProductName: String, 
            ProductWeight: Number, 
            ProductPrice: Number, 
            ProductDetail: String, 
            ProductManuf: Date,
            ProductExp: Date,
            ProductImage: String
        ):Products,
    
        addToCarts(
            ProductName: String,
            ProductWeight: Number,
            ProductPrice: Number,
            ProductImage: String
        ):Carts

        deleteToCarts(id: ID):String,

        registerUser(registerInput: RegisterInput):User
        loginUser(loginInput: LoginInput):User
        deleteUser(id:ID): String
    },
    
`

export default typeDefs;