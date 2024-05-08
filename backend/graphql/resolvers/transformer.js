import models from '../../models/index.js'; 


const transformUser = user => {
    return {
        ...user._doc, // equivalent to user.toObject()
        _id: user.id,
        createdBooks: getListTransformedBooks.bind(this, user._doc.createdBooks),
    };
}

const getSingleTransformedUser = async userID => {
    try {
        const user = await models.User.findById(userID);
        return transformUser(user);
    } catch (err) {
        throw err;
    }
}

const getListTransformedUser = async userIDs => {
    try {
        const users = await models.User.find({ _id: { $in: userIDs } });
        return users.map(user => {
            return transformUser(user);
        });
    } catch (err) {
        throw err;
    }
}

const transformBook = book => {
    return {
        ...book._doc,
        _id: book.id,
        creator: getSingleTransformedUser.bind(this, book._doc.creator),
        membersList: getListTransformedUser.bind(this, book._doc.membersList),
        paymentsList: book._doc.paymentsList.map(payment => {
            return transformPayment(payment);
        }),
    };
}

const transformPayment = payment => {
    return {
        ...payment._doc,
        _id: payment.id,
        paidBy: getSingleTransformedUser.bind(this, payment._doc.paidBy),
        sharedBy: getListTransformedUser.bind(this, payment._doc.sharedBy),
    };
}

const getListTransformedBooks = async bookIDs => {
    try {
        const books = await models.Book.find({ _id: { $in: bookIDs } });
        return books.map(book => {
            return transformBook(book);
        });
    } catch (err) {
        throw err;
    }
}



export { transformUser, getSingleTransformedUser, getListTransformedUser, transformBook, transformPayment, getListTransformedBooks };
