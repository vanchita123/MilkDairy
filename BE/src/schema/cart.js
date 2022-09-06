import { gql } from "apollo-server-express";

export default gql`
    type Carts {
        id: ID
        ProductName: String
        ProductWeight: Number
        ProductPrice: Number
        ProductImage: String
    }

    type Query {
        getCarts: [Carts]
        getCart(id: ID): Carts
    }

    type Mutation {
        addToCarts(
            ProductName: String
            ProductWeight: Number
            ProductPrice: Number
            ProductImage: String
        ):Carts

        deleteToCarts(id: ID): String
    }
`;
