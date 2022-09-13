import { gql } from "apollo-server-express";

export default gql`
    type Carts {
        id: ID
        ProductName: String
        ProductWeight: Number
        ProductQty: Number
        ProductPrice: Number
        ProductImage: String
        TotalPrice: Number
    }

    type Query {
        getCarts: [Carts]
        getCart(id: ID): Carts
    }

    type Mutation {
        addToCarts(
            ProductName: String
            ProductWeight: Number
            ProductQty: Number
            ProductPrice: Number
            ProductImage: String
            TotalPrice: Number
        ):Carts

        deleteToCarts(id: ID): String
    }
`;
