import React, { useRef } from 'react';
import { Link } from 'react-router-dom';


const SignUp = () => {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        
        if(!email || !username || !password) {
            return;
        }
        if(email.trim().length === 0 || username.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        try {
            await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    mutation {
                        createUser(userInput: {email: "${email}", username: "${username}", password: "${password}"}) {
                            _id
                            email
                            username
                        }
                    }
                    `
                })
            })
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <form className='flex-col justify-center w-1/4 mx-auto mt-10 px-10 py-10 rounded-2xl bg-[#EAEAEA]' onSubmit={handleSubmit}>
                {/* header section */}
                <p className='text-xl font-bold leading-xl border-b-2 text-center border-[#797777]'>
                    Sign Up
                </p>
                <p className='text-md text-[#929191] text-center'>
                    Split bill easily when having fun.
                </p>

                {/* email and password section */}

                <div className='px-[4%] mt-[10%] mb-[4%]'>
                    <input ref={emailRef} type='text' placeholder='Email' className='bg-[#D9D9D9] rounded-md px-2 py-2 w-full'  />
                </div>

                <div className='px-[4%] mb-[4%]'>
                    <input ref={usernameRef} type='text' placeholder='UserName' className='bg-[#D9D9D9] rounded-md px-2 py-2 w-full'  />
                </div>

                <div className='px-[4%] mb-[4%]'>
                    <input ref={passwordRef} type='password' placeholder='Password' className='bg-[#D9D9D9] rounded-md px-2 py-2 w-full'  />
                </div>


                {/* button section */}

                <button className='text-center text-md font-bold text-white bg-[#EE7214] rounded-lg my-[4%] w-full py-1'>
                    Sign Up
                </button>
            

                <p className='text-center pt-4'>
                    Already have an account?
                    <Link to='/login' className='text-[#EE7214] font-bold'> Sign In</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;