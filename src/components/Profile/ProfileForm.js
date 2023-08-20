
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/AuthContext';
import { useContext,useRef } from 'react';

const ProfileForm = () => {
  const pass = useRef();

  const url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA84SBp78NvCnkWbJEvJ18eFTnxW6WfcJk";
  const AuthCtx = useContext(AuthContext);
  const changePasswordHandler=()=>{
    // e.preventDefault();
const enteredPass = pass.current.value;
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        idToken: AuthCtx.token,
        password: enteredPass,
        returnSecureToken:false
      })
    }).then(res=>{
      //
    })
  }
  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={pass} />
      </div>
      <div className={classes.action}>
        <button >Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
