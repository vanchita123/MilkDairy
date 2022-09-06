import { gql } from "apollo-server-express";

export default gql`
    type User{
        id: ID
        UserName: String
        UserEmail: String
        UserPhone: PhoneNumber
        UserPassword: String
        token: String
    }

    input RegisterInput {
        UserName: String
        UserEmail: String
        UserPhone: PhoneNumber
        UserPassword: String
        UserConfirmPassword: String
        token: String
    }

    input LoginInput {
        UserEmail: String
        UserPassword: String
    }

    type Query {
        Users:[User]
        getUser(id:ID): User
    }

    type Mutation {
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        deleteUser(id:ID): String
    }
`;