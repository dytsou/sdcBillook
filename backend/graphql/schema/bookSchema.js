export const bookTypes = `
    type Book {
        _id: ID!
        name: String!
        creator: User!
        board: String!
        membersList: [User!]!
        paymentsList: [Payment!]!
    }

    input BookInput {
        name: String!
        board: String
        creator: ID!
    }

    type RootQuery {
        books: [Book!]!
        book(bookID: ID): Book!
    }

    type RootMutation {
        createBook(bookInput: BookInput!): Book
        deleteBook(bookID: ID!): Book
        addMember(bookID: ID!, userID: ID!): Book
        removeMember(bookID: ID!, userID: ID!): Book
    }
`