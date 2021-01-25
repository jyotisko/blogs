import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { app } from './../firebase';
import toast, { Toaster } from 'react-hot-toast';

const Edit = ({ user }) => {

  const { id } = useParams();
  const history = useHistory();
  const [blog, setBlog] = useState();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const url = `https://blog-api-jyotisko.herokuapp.com/api/v1/blogs/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setLoading(false);
        setUserID(data.blog.userID);
        setBlog(data);
        setTitle(data.blog.title);
        setBody(data.blog.body);
        setAuthor(data.blog.author);
      } catch (err) {
        setError(true);
      }
    })();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (userID !== app.auth().currentUser.uid) return toast.error('You can\'t edit blogs you haven\'t written!', { duration: 5000 });
    try {
      if (!title || !body || !author) return toast.error('The field(s) could not be left empty!');
      setLoading(true);
      const newBlogData = {
        title: title,
        body: body,
        author: author
      }
      const data = await fetch(`https://blog-api-jyotisko.herokuapp.com/api/v1/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(newBlogData),
        body: JSON.stringify(newBlogData),
      });
      if (!data.ok) throw new Error('Something went wrong');
      else {
        setError(false);
        history.push('/');
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      {user ? (
        <div>
          {
            blog && (
              <>
                <div className='create'>
                  <h2>Edit Blog</h2>
                  <form onSubmit={handleSubmit}>
                    <label>Blog Title: </label>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                    <label>Blog Body: </label>
                    <textarea style={{ resize: 'vertical' }} type='text' value={body} onChange={e => setBody(e.target.value)} />
                    <label>Blog Author: </label>
                    <input type='text' value={author} disabled />
                    <button type='submit'>Edit Changes</button>
                  </form>
                </div>
              </>
            )
          }
          {
            error && <div>Something went wrong. Failed to fetch...</div>
          }
          {
            loading && <div>Loading...</div>
          }
        </div>
      ) : (
          <h4><Link to='/login'>Login</Link> to be able to edit your blogs.</h4>
        )}

      <Toaster position='bottom-center' />
    </>
  );
}

export default Edit;