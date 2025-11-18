import { Link } from "react-router-dom";

function BookListItem({ BookName = "Unknown Bookname", BookDesc = "No description", BookCover = "https://placehold.co/300" }) {
    return (
        <div className="flex flex-col justify-between bg-gray shadow-md rounded-xl overflow-hidden w-72 pt-4 px-0">
            <img src={BookCover} alt="book cover" className="h-[150px] px-4 mb-4 rounded-t-xl object-cover" />
            <div className="px-2 mb-4">
                <h1 className="text-2xl font-bold mb-2">{BookName}</h1>
                <p className="text-base">{BookDesc}</p>
            </div>
            <Link to="/joinbook" className="text-lg text-center py-2 font-bold border-t-2 border-gray-dark">Join</Link>
        </div>
    )
}

export default BookListItem;

/*
        <div className='flex flex-wrap justify-center items-center bg-[#D9D9D9] shadow-md rounded-xl overflow-hidden h-[70%] py-[2%] px-[0%]'>
        <img src={image} alt='Book cover' className='w-[90%] h-[50%] rounded-t-xl object-cover'/>
        <div className='px-[4%] py-[2%]'>
            <p className='text-2xl font-bold mb-[1%]'>Book Name</p>
            <p className='text-normal'></p>
        </div>
        <Link to={`/bookdetail/${id}`} className='block text-center border-t-2 border-[#929191] rounded-b-xl w-full py-[2%] text-lg font-bold'>Join</Link>
        </div>
*/