import BookListItem from "./BookListItem";
import {useContext, useEffect, useState, useCallback} from "react";
import AuthContext from "../../Store/AuthContent";

function BooksList() {
    const auth = useContext(AuthContext);
    const [booksData, setBooksData] = useState([]);
    const fetchBookList = useCallback(async () => {
        if(!auth.isLoggedIn) return;
        try {
            const request = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    query: `
                    query {
                        user(userId: "${auth.userId}") {
                            createdBooks {
                                _id
                                name
                                board
                            }
                        }
                    }
                    `
                })
            });
            if(request.status !== 200 && request.status !== 201) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await request.json();
            setBooksData(responseData.data.user.createdBooks.map((book) => {
                return {
                    id: book._id,
                    name: book.name,
                    description: book.board,
                    image: "https://placehold.co/400"
                }
            }));
        } catch(err) {
            console.error(err);
        }
    }, [auth.isLoggedIn, auth.token, auth.userId]);
    useEffect(() => {
        fetchBookList();
    }, [fetchBookList]);
    if(!auth.isLoggedIn) {
        return (
            <div className='bg-gray-light px-8 py-8 rounded-2xl'>
                <p className='text-4xl font-bold px-8 mb-8 pb-4 border-gray-dark border-b-2'>User's Book</p>
                <p className='text-2xl font-medium px-8'>Please login to view your book</p>
            </div>
        );
    }
    let bookList;
    if(booksData.length === 0) {
        bookList = <p className='text-2xl font-medium px-8'>No book found</p>;
    }
    else
    {
        bookList = booksData.map((book) => {
            return (
                <BookListItem 
                    key={book.id}
                    BookName={book.name}
                    BookDesc={book.description}
                    BookCover={book.image}
                />
            );
        });
    }
    return (
        <div>
            <div className='bg-gray-light px-8 pt-4 rounded-2xl'>
                <p className='text-4xl font-bold px-8 mb-8 pb-4 border-gray-dark border-b-2'>User's Book</p>
                <div className='justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8'>
                    {bookList}
                </div>
            </div>
        </div>
    );
}

export default BooksList;