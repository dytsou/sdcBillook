import mongoose from 'mongoose';
import payment from './payment.js';

// paymentSchema.pre('save', async function () {
//     const payment = this;
//     const hasDuplicates = new Set(payment.sharedBy.map(id => id.toString())).size !== payment.sharedBy.length;
//     if (hasDuplicates) {
//         throw new Error('Shared by list contains duplicates');
//     }
// });

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    board: {
        type: String
    },
    membersList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    paymentsList: {
        type: [payment],
        required: true
    }
});

export default mongoose.model("Book", bookSchema);