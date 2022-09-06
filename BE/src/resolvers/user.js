import { ApolloError } from "apollo-server-express";
import User from "../../Models/User.js";

export default {
    Query: {
        Users: async () => {
            const users = await User.find();
            return users;
        },

        getUser: async (root, args) => {
            const user = await User.findById(args.id)
            return user;
        },
    },
    Mutation: {
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

    }
}