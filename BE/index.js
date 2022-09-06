import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import typeDefs from "./src/schema/index.js";
import resolvers from "./src/resolvers/index.js";
// import typeDefs from "./Controllers/typeDefs.js";
// import resolvers from "./Controllers/resolvers.js";
import models from "./src/models/index.js";

async function initServer() {
    // console.log("hjsgfh");
    const app = express();
    app.use(cors());
    dotenv.config();
    const apolloServer = new ApolloServer({typeDefs, resolvers});

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/graphql" });
    // // console.log("45624654");

    app.use((req, res) => {
        res.send("server stated 5001");
    });
    // console.log("gfryge65");
        const PORT = process.env.PORT || 5001;
    // const MONGODB ='mongodb://127.0.0.1:27017/Dairy';
    
    // connectDB().then(async () => {
	// 	// await insertPredefineData(models);
	// 	app.listen(process.env.PORT, () =>
    //     console.log(`🚀 Express server started successfully!!!!!.....${PORT}`)
	// 	);
	// });

    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
        .then(() => {
            console.log(`🚀 MongoDb connection  successed!!!....${PORT}`);
        }).catch((error) => {
            console.log("Error::", error);
        });
    app.listen(PORT, () => {
        console.log(`🚀 Express server started successfully!!!!!.....${PORT}`);
    });
    console.log("done");
}
initServer();


