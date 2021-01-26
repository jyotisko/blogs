import { useHistory, useParams } from "react-router-dom";
import useFetch from '../useFetch';
import { Link } from 'react-router-dom';
import { app } from './../firebase';
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const BlogDetails = ({ user }) => {

  const { id } = useParams();

  const history = useHistory();

  const [blog, isPending, error] = useFetch(`https://blog-api-jyotisko.herokuapp.com/api/v1/blogs/${id}`);

  const deleteBlog = () => {
    fetch(`https://blog-api-jyotisko.herokuapp.com/api/v1/blogs/${id}`,
      { method: 'DELETE' }
    ).then(_ => history.push('/'));
  };

  useEffect(() => {
    let loadingToast;
    if (isPending) loadingToast = toast.loading('Loading...');
    else toast.dismiss(loadingToast);
  }, [isPending]);

  useEffect(() => {
    error && toast.error('Something went wrong', { duration: 5000 });
  }, [error]);

  return (
    <>
      {user ? (
        <div className='blog-details'>
          {
            error && <div>Something went wrong...</div>
          }
          {
            blog && <article>
              <h2>{blog.blog.title}</h2>
              <p>Written by {blog.blog.author}</p>
              <div>{blog.blog.body}</div>
              {blog.blog.userID === app.auth().currentUser.uid && (
                <>
                  <button onClick={deleteBlog} className='delete-blog'>Delete</button>
                  <Link to={`/edit/${blog.blog._id}`}><button>Edit</button></Link>
                </>
              )}
            </article>
          }
        </div>
      ) : (
          <h4><Link to='/login'>Login</Link> to view blog.</h4>
        )}
      <Toaster toastOptions={{
        className: 'toast-element'
      }} position='bottom-center' />
    </>
  );
}

export default BlogDetails;