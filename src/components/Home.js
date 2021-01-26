import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from '../useFetch';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Home = ({ user }) => {

  const [blogs, isPending, error] = useFetch('https://blog-api-jyotisko.herokuapp.com/api/v1/blogs');

  useEffect(() => {
    let loadingToast;
    if (isPending) loadingToast = toast.loading('Loading...');
    else toast.dismiss(loadingToast);
  }, [isPending]);

  useEffect(() => {
    if (error) toast.error('Something went wrong...', { duration: 5000 });
  }, [error]);

  return (
    <div className='home'>
      {user ? (
        <>
          {blogs && <BlogList blogs={blogs} title='All Blogs!' />}
        </>
      ) : (
          <h4><Link to='/login'>Login</Link> to view blogs</h4>
        )
      }
      <Toaster toastOptions={{
        className: 'toast-element'
      }} position='bottom-center' />
    </div>
  );
};

export default Home;
