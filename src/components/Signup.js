import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { app } from './../firebase';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const loading = toast.loading('Loading...');
    try {
      const credentials = await app.auth().createUserWithEmailAndPassword(email, password);
      await credentials.user.updateProfile({
        displayName: username
      });
      toast.dismiss(loading);
      history.push('/');
    } catch (err) {
      toast.dismiss(loading);
      toast.error(err.message, { duration: 5000 });
    }
  };

  return (
    <div className='create'>
      <Toaster toastOptions={{
        className: 'toast-element'
      }} position='bottom-center' />
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
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
        <button type='submit'>Sign Up</button>
      </form>
      <div>Already have an account? <Link to='/login'>Login</Link></div>
    </div>
  );
}

export default Signup;