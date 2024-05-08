export const userTypes = `
    type User {
        _id: ID!
        username: String!
        password: String
        email: String!
        createdBooks: [Book!]!
    }

    input UserInput {
        username: String!
        password: String!
        email: String!
    }
   
    type RootQuery {
        users: [User!]!
        user(userID: ID!): User!
    }
    
    type RootMutation {
        createUser(userInput: UserInput!): User
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }
    
    type RootQuery {
        users: [User!]!
        user(userId: ID!): User!
        login(email: String!, password: String!): AuthData!
    }
`