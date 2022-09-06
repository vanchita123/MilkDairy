import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        require: true,
        trim: true
    },
    UserEmail: {
        type: String,
        validate: {
            validator: function (v) {
                return /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/.test(v);
            },
            message: (props) => `${props.value} is not a valid Email Address!`
        },
        required: [true, 'User Email Address required']
    },
    UserPhone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    UserPassword: String,
    UserConfirmPassword: String,
    token: { type: String }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
