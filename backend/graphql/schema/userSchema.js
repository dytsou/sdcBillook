export const userTypes = `
    type User {
        _id: ID!
        username: String!
        password: String
        email: String!
        
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
`