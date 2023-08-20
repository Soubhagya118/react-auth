import { useState, useRef,useContext } from 'react';
import AuthContext from '../../store/AuthContext'
import classes from './AuthForm.module.css';

const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading ,setIsLoading] = useState(false)
  const emailRef=useRef();
  const passwordRef =useRef();

  const AuthCtx = useContext(AuthContext);
  console.log("AuthCtx",AuthCtx)

  const url='https://identitytoolkit.googleapis.com/v1/accounts:'
  const api='AIzaSyA84SBp78NvCnkWbJEvJ18eFTnxW6WfcJk';

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler=(e)=>{
    e.preventDefault();
    const emailIn= emailRef.current.value;
    const passIn= passwordRef.current.value;
setIsLoading(true);
let urlAuth;
if(isLogin){
  urlAuth=`${url}signInWithPassword?key=${api}`

}else{
  urlAuth=`${url}signUp?key=${api}`;
}
  fetch(urlAuth, {
    method:'POST',
    body: JSON.stringify({
      email: emailIn,
      password: passIn,
      returnSecureToken: true
    }),
     headers:{
    'Content-Type': 'application/json',
    }


  })
  .then(response => {
    setIsLoading(false);
    if (!response.ok) {
      alert("Authentication Failed.....");
      throw new Error('Authentication Failed.....');
    }

    return response.json();
  })
  .then(data => {

    AuthCtx.login(data.idToken);
    console.log('User signed up:', data);
   
  })
  .catch(error => {
    
    console.log("error", error);
  });
  
  

}

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form  onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email'  ref={emailRef} required/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
        {!isLoading &&<button>{isLogin ?  'Login': 'Create Account'}</button>}
        {isLoading && <p style={{color:'white'}}>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
