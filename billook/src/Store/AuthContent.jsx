import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    login: (token, userId) => {},
    logout: () => {}
})


export default AuthContext;