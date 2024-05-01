import userResolvers from './user.js';
import bookResolvers from './book.js';

// Root resolver
const root = {
    ...userResolvers,
    ...bookResolvers,
};

export default root;
