import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from '../useFetch';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Home = ({ user }) => {

  const [data, isPending, error] = useFetch(`${process.env.REACT_APP_API_URL}blogs`);

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
          {data && <BlogList blogs={data.blogs} title='All Blogs!' />}
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
