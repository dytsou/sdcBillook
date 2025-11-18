import React, { useState, useRef, useContext } from "react";
import { FiUpload } from "react-icons/fi";
import AuthContext from "../../Store/AuthContent";

function CreateBook() {
    // const [bookName, setBookName] = useState("Your book name");
    const [photoName, setPhotoName] = useState("No file chosen");
    // const [bulletinBoard, setBulletinBoard] = useState("Enter group announcement here...");
    const [file, setFile] = useState(null);
    const bookNameRef = useRef(null);
    const bulletinBoardRef = useRef(null);
    const auth = useContext(AuthContext);

    function handleFileChange(e) {
        setFile(e.target.files[0]);
        setPhotoName(e.target.files[0].name);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // avoid execute default action

        const bookName = bookNameRef.current.value;
        let bulletinBoard = bulletinBoardRef.current.value;

        if(!auth.isLoggedIn || !auth.userId) {
            return;
        }

        if(!bookName || bookName.trim().length === 0) {
            return;
        }

        if(!bulletinBoard || bulletinBoard.trim().length === 0) {
            bulletinBoard = "No announcement";
        }
        try
        {
            const request = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    query: `
                    mutation {
                        createBook(bookInput: {name: "${bookName}", board:"${bulletinBoard}", creator: "${auth.userId}"}) {
                            _id
                            name
                            creator
                            {
                                _id
                                username
                            }
                            board
                        }
                    }
                    `
                })
            });
            if(request.status !== 200 && request.status !== 201) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await request.json();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <form className='mx-[12%] mt-[8%] mb-[16%] bg-gray-light rounded-2xl px-[6%] py-[4%]' onSubmit={handleSubmit}>
            <p className='text-4xl font-bold text-[#EE7214] py-[2%]'>Create New Account Book</p>
            <div className='flex mx-[8%] my-[2%]'>
                <div className='flex flex-col justify-start w-1/2'>
                    <label className='text-lg font-bold'>Book Name</label>
                    <input className='bg-gray rounded-md px-2 py-1 w-1/2' type="text" placeholder="Your book name" ref={bookNameRef} />
                </div>
                <div className='flex flex-col justify-start w-1/2'>
                    <label className='text-lg font-bold'>Book Photo</label>
                    <div className="flex items-center h-full">
                        <input className="px-2 py-1 bg-gray rounded-md" type="text" value={photoName} placeholder="No file chosen" readOnly />
                        <label className="ml-2 bg-transparent rounded cursor-pointer">
                            <FiUpload className="w-4 h-4" />
                            <input type="file" className="hidden" onClick={handleFileChange} />
                        </label>
                    </div>
                </div>
            </div>
            <div className='flex mx-[8%] my-[2%]'>
                <div className='flex flex-col w-full'>
                    <label className='text-lg font-bold'>Bulletin Board</label>
                    <textarea className="bg-gray rounded-md p-2"
                        type="text" ref={bulletinBoardRef} placeholder="Enter group announcement here..."
                        rows="4" // Sets the visible number of lines in the textarea
                        cols="50" // Sets the visible width of the textarea
                    />
                </div>
            </div>
            <div className='flex justify-end my-[2%]'>
                <button className='text-md font-bold text-[#FFFFFF] bg-[#EE7214] rounded-md px-3 py-1' type="submit">Create</button>
            </div>
        </form>
    )
}

export default CreateBook;