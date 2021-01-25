import { Link } from 'react-router-dom';
import { app } from './../firebase';

const NavBar = ({ user }) => {
  return (
    <nav className='navbar'>
      <h1>My Blog</h1>
      <div className='links'>
        {user ? (
          <>
            <Link to='/'>Home</Link>
            <Link to='/create'>New Blog</Link>
            <Link to='/search'>Search</Link>
            <button className='logout-btn' onClick={() => app.auth().signOut()}>Logout</button>
          </>
        ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign up</Link>
            </>
          )}
      </div>
    </nav>
  );
}

export default NavBar;
