export const paymentTypes = `
    type Payment {
        _id: ID!
        name: String!
        amount: Int!
        paidBy: User!
        sharedBy: [User!]!
        createdAt: String!
        updatedAt: String!
    }
    
    input PaymentInput {
        name: String!
        amount: Int!
        paidBy: ID!
        sharedBy: [ID!]!
    }

    type RootMutation {
        addPayment(bookID: ID!, paymentInput: PaymentInput!): Book
        editPayment(bookID: ID!, paymentID: ID!, paymentInput: PaymentInput!): Book
        deletePayment(bookID: ID!, paymentID: ID!): Book
    }
`;