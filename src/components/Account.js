import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { app } from './../firebase';
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';

const Account = ({ user }) => {

  const history = useHistory();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [profilePicUrl, setProfilePicUrl] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    if (!user) return;
    setEmail(app.auth().currentUser.email);
    setUsername(app.auth().currentUser.displayName);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      let loadingToast;
      try {
        loadingToast = toast.loading('Fetching your data...');

        const res = await fetch(`${process.env.REACT_APP_API_URL}users/${app.auth().currentUser.uid}`);
        const data = await res.json();

        setBio(data.user.bio);
        setProfilePicUrl(data.user.profilePicUrl);
        toast.dismiss(loadingToast);

      } catch (err) {
        toast.dismiss(loadingToast);
        toast.error('Something went wrong', { duration: 5000 });
      }
    })();
  }, [user]);

  const getUniqueProfilePicName = file => `${file.name.split('.')[0]}${app.auth().currentUser.uid}.${file.name.split('.')[file.name.split('.').length - 1]}`;

  const uploadFile = async file => {
    try {
      if (!file) return;
      const storageRef = app.storage().ref(`profile/${getUniqueProfilePicName(file)}`);
      const snapshot = await storageRef.put(file);
      const downloadUrl = await snapshot.ref.getDownloadURL();
      return downloadUrl;
    } catch (err) {
      throw err;
    }
  };

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
      if (!passwordForConfirmation) return toast('Enter password to update changes.');
      loadingToast = toast.loading('Updating your account...');
      await app.auth().signInWithEmailAndPassword(app.auth().currentUser.email, passwordForConfirmation);
      const newProfilePicUrl = await uploadFile(file);
      await fetch(`${process.env.REACT_APP_API_URL}users/${app.auth().currentUser.uid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          bio: bio,
          profilePicUrl: newProfilePicUrl,
        })
      });
      await fetch(`${process.env.REACT_APP_API_URL}blogs/updateAllAuthor/${app.auth().currentUser.uid}`, {
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
      history.push('/');
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
              {profilePicUrl ? (
                <>
                  <img className='author-image' src={profilePicUrl} alt={username} />
                  <label>Choose Profile Picture: </label>
                  <input className='file-input' type='file' onChange={e => setFile(e.target.files[0])} />
                </>
              ) : <h4>Getting profile pic...</h4>}
              <label>Username: </label><input minLength='3' type='text' value={username} onChange={e => setUsername(e.target.value)}></input>
              <label>Email: </label><input type='email' value={email} onChange={e => setEmail(e.target.value)}></input>
              <label>Bio: </label><textarea type='text' value={bio} onChange={e => setBio(e.target.value)} placeholder='Write something about yourself...'></textarea>
              <button type='submit'>Change Account Info</button>
            </form>
            <button className='signout-btn' onClick={() => app.auth().signOut().then(history.push('/'))}>Log out</button>
          </div>
          <Toaster toastOptions={{
            className: 'toast-element'
          }} position='bottom-center' />
        </>
      ) : (
        <h4 className='login-to-view'><Link to='/login'>Login</Link> to view account...</h4>
      )}
    </>
  );
}

export default Account;