// import mongoose from "mongoose"
import Product from "./product.js";
import Carts from "./cart.js";
import User from "../../Models/User.js";

// const connectDB = () => {
//     mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, })
//     .then(() => {
//         console.log(`🚀 MongoDb connection  successed!!!....${PORT}`);
//     }).catch((error) => {
//         console.log("Error::", error);
//     });
//     // return mongoose.connect(process.env.MONGODB, {
//     //     useNewUrlParser: true,
//     //     useCreateIndex: true,
//     //     useUnifiedTopology: true,
//     //     useFindAndModify: false,
//     // }).then(() => {
//     //     console.log("MongoDB connection successful");
//     // }).catch((err) => {
//     //     console.log("error::", err);
//     // });
// };

// mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, })
//     .then(() => {
//         console.log(`🚀 MongoDb connection  successed!!!....${PORT}`);
//     }).catch((error) => {
//         console.log("Error::", error);
//     });
// app.listen(PORT, () => {
//     console.log(`🚀 Express server started successfully!!!!!.....${PORT}`);
// });
// console.log("done");

const models = {
    Product,
    Carts,
    User
}

// export {connectDB};
export default models;