import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { app } from './../firebase';
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';

const Account = ({ user }) => {

  const history = useHistory();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    if (!user) return;
    setEmail(app.auth().currentUser.email);
    setUsername(app.auth().currentUser.displayName);
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();
    let loadingToast;
    try {
      const passwordForConfirmation = await swal({
        content: {
          element: 'input',
          attributes: {
            placeholder: 'Type your password to continue',
            type: 'password'
          }
        }
      });
      if (!passwordForConfirmation) return;
      loadingToast = toast.loading('Updating your account...');
      await app.auth().signInWithEmailAndPassword(app.auth().currentUser.email, passwordForConfirmation);
      await fetch(`https://blog-api-jyotisko.herokuapp.com/api/v1/blogs/updateAllAuthor/${app.auth().currentUser.uid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authorName: username
        })
      });
      await app.auth().currentUser.updateEmail(email);
      await app.auth().currentUser.updateProfile({
        displayName: username
      });
      toast.dismiss(loadingToast);
      toast.success('Yay! Account info changed successfully.', { duration: 3000 });
      console.log(app.auth().currentUser.displayName);
    } catch (err) {
      toast.dismiss(loadingToast);
      if (err.code === 'auth/wrong-password') return toast.error('Password is incorrect. Operation suspended.', { duration: 5000 });
      toast.error(err.message, { duration: 5000 });
    }
  };

  return (
    <>
      {user ? (
        <>
          <div className='account-container create'>
            <h2>Edit Account Info</h2>
            <form className='create' onSubmit={handleSubmit}>
              <label>Username: </label><input minLength='3' type='text' value={username} onChange={e => setUsername(e.target.value)}></input>
              <label>Email: </label><input type='email' value={email} onChange={e => setEmail(e.target.value)}></input>
              <button type='submit'>Change Account Info</button>
            </form>
            <button className='signout-btn' onClick={() => app.auth().signOut().then(history.push('/'))}>Log out</button>
          </div>
          <Toaster toastOptions={{
            className: 'toast-element'
          }} position='bottom-center' />
        </>
      ) : (
          <h4><Link to='/login'>Login</Link> to view account...</h4>
        )}
    </>
  );
}

export default Account;