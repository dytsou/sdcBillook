import { mergeTypeDefs } from '@graphql-tools/merge';
import {userTypes} from './userSchema.js';

const rootTypes = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const types = [rootTypes, userTypes];

// module.exports = mergeTypeDefs(types);
export default mergeTypeDefs(types);