import React,{useState} from 'react'

 const AuthContext = React.createContext({
    token: '',
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{}
});

export const AuthContextProvider =({children})=>{
const [ token,setToken] = useState(null);

const isLoggedInHandler= !!token;
const loginHandler=(newtoken)=>{
    setToken(newtoken);
};
const logoutHandler =()=>{
    setToken(null);
};

const storedContextValue ={
    token:token,
    isLoggedIn:isLoggedInHandler,
    login:loginHandler,
    logout:logoutHandler
}
    return(
        <AuthContext.Provider value={storedContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
