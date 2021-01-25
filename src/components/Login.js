import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { app } from './../firebase';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const loading = toast.loading('Loading...');
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      toast.dismiss(loading);
      history.push('/');
    } catch (err) {
      toast.dismiss(loading);
      toast.error('Wrong Credentials!', { duration: 5000 });
    }
  };

  return (
    <div className='create'>
      <Toaster position='bottom-center' />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password: </label>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      <div>Don't have an account? <Link to='/signup'>Sign Up</Link></div>
    </div>
  );
}

export default Login;