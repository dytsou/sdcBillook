import BookListItem from "./BookListItem";

const BookData = [
    {id: 1, name: "Book 1", description: "Book Description 1", image: "https://placehold.co/400"},
    {id: 2, name: "Book 2", description: "Book Description 2", image: "https://placehold.co/500"},
    {id: 3, name: "Book 3", description: "Book Description 3", image: "https://placehold.co/600"},
    {id: 4, name: "Book 4", description: "Book Description 4", image: "https://placehold.co/700"},
]

function BooksList() {
    const bookList = BookData.map((book) => {
        return (
            <BookListItem 
                key={book.id}
                BookName={book.name}
                BookDesc={book.description}
                BookCover={book.image}
            />
        );
    });
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