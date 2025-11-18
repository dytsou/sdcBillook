import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import BooksList from './Pages/Userbook/BooksList'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Pages/Authentication/Login'
import SignUp from './Pages/Authentication/SignUp'
import AuthContext from './Store/AuthContent'
import { useState } from 'react'

function App() {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        token: null,
        userId: null
    });

    const login = (token, userId) => {
        setAuth({
            isLoggedIn: true,
            token: token,
            userId: userId
        });
    }
    const logout = () => {
        setAuth({
            isLoggedIn: false,
            token: null,
            userId: null
        });
    }

    return (
        <BrowserRouter>
        <AuthContext.Provider value={{
            isLoggedIn: auth.isLoggedIn,
            token: auth.token,
            userId: auth.userId,
            login: login,
            logout: logout
        }}>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Homepage/>} />
                <Route path="mybook" element={<BooksList />} />
                <Route path="joinbook" element={<h1>joinbook</h1>} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="*" element={<h1>Error 404: Not Found</h1>} />
            </Route>
        </Routes>      
        </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;