import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import { print, buildSchema } from 'graphql';
import dotenv from 'dotenv';
import typedef from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';
import enableCors from './middleware/enable-cors.js';
import isAuth from './middleware/is-auth.js';

dotenv.config(); // Load environment variables from a .env file into process.env

// Create an express app
const app = express();
const port = process.env.PORT || 5000;
const graphqlTypedef = typedef;
const graphqlSchema = buildSchema(print(graphqlTypedef))
const graphqlResolvers = resolvers;
app.use(bodyParser.json());
app.use(enableCors);
app.use(isAuth);

const MONGO_URI=`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
console.log(print(graphqlTypedef));
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true, // Enable GraphiQL when accessed via browser
    }));

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port localhost:${port}`);
            console.log(`Visit http://localhost:${port}/graphql to interact with the GraphQL API.`);
        });
    })
    .catch(err => {
        console.log(err);
    });