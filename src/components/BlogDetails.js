import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import useFetch from '../useFetch';
import { app } from './../firebase';
import icons from './../assets/icons.svg';

const BlogDetails = ({ user }) => {

  const { id } = useParams();
  const history = useHistory();
  const [blog, isPending, error] = useFetch(`${process.env.REACT_APP_API_URL}blogs/${id}`);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const deleteBlog = () => {
    fetch(`${process.env.REACT_APP_API_URL}blogs/${id}`,
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

  useEffect(() => {
    if (!blog) return;

    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}bookmarks/?userID=${app.auth().currentUser.uid}&blogID=${id}`);
        const data = await res.json();
        data.results === 0 ? setIsBookmarked(false) : setIsBookmarked(true);
        setIsReady(true);

      } catch (err) {
        toast.error('Something went wrong! Failed to fetch.', { duration: 5000 });
      }
    })();

  }, [blog]);

  const removeBookmark = async () => {
    let loadingToast = toast.loading('Removing bookmark...');
    try {
      await fetch(`${process.env.REACT_APP_API_URL}bookmarks?blogID=${id}&userID=${app.auth().currentUser.uid}`, {
        method: 'DELETE'
      });
      setIsBookmarked(false);
      toast.dismiss(loadingToast);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong! Failed to fetch.', { duration: 5000 });
    }
  };

  const addBookmark = async () => {
    let loadingToast = toast.loading('Adding bookmark...');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}bookmarks`, {
        method: 'POST',
        body: JSON.stringify({
          blogID: id,
          userID: app.auth().currentUser.uid
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      await res.json();
      setIsBookmarked(true);
      toast.dismiss(loadingToast);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong! Failed to fetch.', { duration: 5000 });
    }
  };

  const handleBookmarkClick = async () => {
    console.log(isBookmarked);
    try {
      if (isBookmarked) {
        await removeBookmark();
      } if (!isBookmarked) {
        await addBookmark();
      }
    } catch (err) {
      toast.error('Something went wrong! Failed to fetch.', { duration: 5000 });
    }
  };

  const SVGImage = ({ isBookmarked }) => {
    return (
      <svg className='svg-bookmark' onClick={handleBookmarkClick}>
        <use xlinkHref={`${icons}#icon-bookmark${isBookmarked ? '-fill' : ''}`} />
      </svg>
    );
  };

  const renderers = {
    code: ({ language, value }) => {
      return <SyntaxHighlighter language={language} children={value} />
    }
  };

  return (
    <>
      {user ? (
        <div className='blog-details'>
          {
            error && <div>Something went wrong...</div>
          }
          {
            isReady && <article>
              <h2 className='blog-title'>{blog.blog.title}</h2>
              <p className='written-by-author'>Written by <a href={`/user/${blog.blog.userID}`}>{blog.blog.author}</a></p>
              <SVGImage isBookmarked={isBookmarked} />
              <div className='blog-body'>
                <ReactMarkdown renderers={renderers} plugins={[gfm]} source={blog.blog.body} />
              </div>
              {
                blog.blog.userID === app.auth().currentUser.uid || app.auth().currentUser.uid === process.env.REACT_APP_ADMIN_UID ? (
                  <>
                    <button onClick={deleteBlog} className='delete-blog'>Delete</button>
                    <Link to={`/edit/${blog.blog._id}`}><button>Edit</button></Link>
                  </>
                ) : ''
              }
            </article>
          }
        </div>
      ) : (
        <h4 className='login-to-view'><Link to='/login'>Login</Link> to view blog.</h4>
      )}
      <Toaster toastOptions={{
        className: 'toast-element'
      }} position='bottom-center' />
    </>
  );
}

export default BlogDetails;