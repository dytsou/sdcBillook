import model from '../../models/index.js'  ;
import objectId from 'mongoose';
import { transformBook } from './transformer.js';


const mutation = {
    addPayment: async args => {
        try {
            const book = await model.Book.findById(args.bookID);
            if (!book) {
                throw new Error('Book not found');
            }
            const payment = {
                name: args.paymentInput.name,
                amount: args.paymentInput.amount,
                description: args.paymentInput.description,
                paidBy: args.paymentInput.paidBy,
                sharedBy: args.paymentInput.sharedBy
            }
            book.paymentsList.push(payment);
            const result = await book.save();
            return transformBook(result);
        } catch (err) {
            throw err;
        }
    },
    editPayment: async args => {
        try {
            const book = await model.Book.findById(args.bookID);
            if (!book) {
                throw new Error('Book not found');
            }
            const convertedID = new objectId(args.paymentID);
            const payment = book.paymentsList.id(args.paymentID);
            if (!payment) {
                throw new Error('Payment not found');
            }
            payment.name = args.paymentInput.name;
            payment.amount = args.paymentInput.amount;
            payment.description = args.paymentInput.description;
            payment.paidBy = args.paymentInput.paidBy;
            payment.sharedBy = args.paymentInput.sharedBy;
            const result = await book.save();
            return transformBook(result);
        } catch (err) {
            throw err;
        }
    },
    deletePayment: async args => {
        try {
            const book = await model.Book.findById(args.bookID);
            if (!book) {
                throw new Error('Book not found');
            }
            book.paymentsList = book.paymentsList.filter(payment => payment.id.toString() !== args.paymentID);
            const result = await book.save();
            return transformBook(result);
        } catch (err) {
            throw err;
        }
    },
}

const paymentResolvers = { 
    ...mutation
}

export default paymentResolvers;