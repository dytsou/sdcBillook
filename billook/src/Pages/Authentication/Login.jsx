import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Store/AuthContent';

const Login = () => {
    const auth = useContext(AuthContext);
    console.log(auth)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
    
        if(!email || !password) {
            return;
        }
        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
    
    
        try {
            const response = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    query {
                        login(email: "${email}", password: "${password}") {
                            userId
                            token
                            tokenExpiration
                        }
                    }
                    `
                })
            })
            if(response.status !== 200 && response.status !== 201) {
                throw new Error('Failed to fetch data');
            }
            const authData = await response.json();
            console.log(authData);
            auth.login(authData.data.login.token, authData.data.login.userId);
        } catch(err) {
            console.error(err);
        }
    
    }

    return (
        <div>
            <form className='flex-col justify-center w-1/4 mx-auto mt-10 px-10 py-10 rounded-2xl bg-[#EAEAEA]' onSubmit={handleSubmit}>
                {/* header section */}
                <p className='text-xl font-bold leading-xl border-b-2 text-center border-[#797777]'>
                    Sign In
                </p>
                <p className='text-md text-[#929191] text-center'>
                    Split bill easily when having fun.
                </p>

                {/* email and password section */}

                <div className='px-[4%] mt-[10%] mb-[4%]'>
                    <input ref={emailRef} type='text' placeholder='Email' className='bg-[#D9D9D9] rounded-md px-2 py-2 w-full'  />
                </div>

                <div className='px-[4%]'>
                    <input ref={passwordRef} type='password' placeholder='Password' className='bg-[#D9D9D9] rounded-md px-2 py-2 w-full'  />
                </div>
                <button className='flex text-sm font-bold text-[#EE7214] px-2 py-0.8'>
                    Forget Password?
                </button>

                {/* button section */}

                <button className='text-center text-md font-bold text-white bg-[#EE7214] rounded-lg my-[4%] w-full py-1'>
                    Sign In
                </button>
                
                <div className="flex items-center justify-center my-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-700">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <p className='text-center pt-4'>
                    do not have an account? 
                    <Link to='/signup' className='text-[#EE7214] font-bold'> Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;