import { Link } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import classes from './MainNavigation.module.css';
import { useContext } from 'react';

const MainNavigation = () => {
  const AuthCtx= useContext(AuthContext);
  const isloggIn = AuthCtx.isLoggedIn;

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
        {!isloggIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
         {isloggIn && <li>
            <Link to='/profile'>Profile</Link>
          </li> }
          {isloggIn && <li>
            <button>Logout</button>
          </li> }
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
