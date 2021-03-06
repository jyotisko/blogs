import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { app } from './../firebase';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from './../context/AuthContext';

const Create = () => {

  const user = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isPending, setIsPending] = useState(false);

  const authorName = app.auth()?.currentUser?.displayName;
  const authorID = app.auth()?.currentUser?.uid;

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    setIsPending(true);
    const loadingToast = toast.loading('Loading...');
    const blog = {
      title: title,
      body: body,
      author: authorName,
      userID: authorID,
      keywords: keywords
    };
    fetch(`${process.env.REACT_APP_API_URL}blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    }).then(_ => {
      setIsPending(false);
      toast.dismiss(loadingToast);
      setTitle('');
      setBody('');
      history.push('/');
    }).catch(_ => {
      toast.error('Something went wrong...');
      setIsPending(false);
      toast.dismiss(loadingToast);
    });
  };

  return (
    <>
      {user ? (
        <div className='create'>
          <h2>Add a new blog</h2>

          <form onSubmit={handleSubmit}>

            <label>Blog Title: </label>
            <input
              type='text'
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <label>Blog Body: </label>
            <textarea
              style={{
                resize: 'vertical'
              }}
              required
              value={body}
              onChange={e => setBody(e.target.value)}
            ></textarea>

            <label>Keywords (seperated by ,):</label>
            <input
              type='text'
              maxLength='50'
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder='cooking,eggs'
            />

            <label>Blog Author: </label>
            <input value={authorName} disabled />

            {!isPending && <button type='submit'>Add Blog</button>}
            {isPending && <button type='submit' disabled>Adding Blog</button>}
          </form>
          <h3 className='learn-to-write'><Link to='/learn'>Learn</Link> to write a blog.</h3>
        </div>
      ) : (
        <h4 className='login-to-view'><Link to='/login'>Login</Link> to create a blog!</h4>
      )}
      <Toaster toastOptions={{
        className: 'toast-element'
      }} position='bottom-center' />
    </>
  );
}

export default Create;