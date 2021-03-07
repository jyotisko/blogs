import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { app } from './../firebase';
import BlogList from './BlogList';

const Bookmarks = ({ user }) => {

  const [bookmarks, setBookmarks] = useState([]);
  const [isNone, setIsNone] = useState(false);

  useEffect(() => {
    if (!user) return;
    let loadingToast;
    (async () => {

      try {
        loadingToast = toast.loading('Fetching your bookmarks...');
        const resBookmarks = await fetch(`${process.env.REACT_APP_API_URL}bookmarks?userID=${app.auth().currentUser.uid}`);
        const dataBookmarks = await resBookmarks.json();

        const blogs = [];

        for (let i = 0; i < dataBookmarks.bookmarks.length; i++) {
          const resBlog = await fetch(`${process.env.REACT_APP_API_URL}blogs/${dataBookmarks.bookmarks[i].blogID}`);
          const dataBlog = await resBlog.json();
          blogs.push(dataBlog.blog);
        }

        setBookmarks(blogs);
        toast.dismiss(loadingToast);
        blogs.length === 0 && setIsNone(true);

      } catch (err) {
        toast.dismiss(loadingToast);
        toast.error('Something went wrong! Failed to fetch.');
      }

    })();
  }, [user]);

  return (
    <>
      {
        user ? (
          <>
            {bookmarks.length > 0 && <BlogList blogs={bookmarks} title='Bookmarks' />}
            {isNone && <h1>No bookmarks yet</h1>}
          </>
        ) : (
          <h4 className='login-to-view'><Link to='/login'>Login</Link> to view blog.</h4>
        )
      }

      <Toaster toastOptions={{
        className: 'toast-element'
      }} position='bottom-center' />
    </>
  );
}

export default Bookmarks;