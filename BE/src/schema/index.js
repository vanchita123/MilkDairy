import { gql } from "apollo-server-express";

import product from "./product.js";
import cart from "./cart.js";
import user from "./user.js";

const linkSchema = gql`
    scalar Date
    scalar Number
    scalar Upload
    scalar PhoneNumber

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

`;

export default [
    linkSchema,
    product,
    cart,
    user
]