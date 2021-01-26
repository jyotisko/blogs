import { Link } from 'react-router-dom';

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
            <Link to='/account'>Account</Link>
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
