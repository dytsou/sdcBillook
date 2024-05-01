import { mergeTypeDefs } from '@graphql-tools/merge';
import {userTypes} from './userSchema.js';
import { bookTypes } from './bookSchema.js';
import { paymentTypes } from './paymentSchema.js';

const rootTypes = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const types = [rootTypes, userTypes, bookTypes, paymentTypes];

// module.exports = mergeTypeDefs(types);
export default mergeTypeDefs(types);