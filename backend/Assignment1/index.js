const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');

const dotenv = require('dotenv');

const schema = require('./schema');
const resolvers = require('./resolvers');

dotenv.config();

const mongodb_atlas_url = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_atlas_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Success: MongoDB connected');
    } catch (error) {
        console.log(`Error: Unable to connect to DB - ${error.message}`);
    }
};

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers
    });

    await server.start(); 

    const app = express();
    app.use(express.json());
    app.use('*', cors());

    server.applyMiddleware({ app });

    app.listen({ port: process.env.PORT }, () => {
        console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
        connectDB();
    });
};

startServer(); 
