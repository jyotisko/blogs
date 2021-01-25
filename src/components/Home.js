import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from '../useFetch';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {

  const [blogs, isPending, error] = useFetch('https://blog-api-jyotisko.herokuapp.com/api/v1/blogs');

  return (
    <div className='home'>
      {user ? (
        <>
          {error && 'Something went wrong :('}
          {isPending ? <div>Loading...</div> : ''}
          {blogs && <BlogList blogs={blogs} title='All Blogs!' />}
        </>
      ) : (
          <h4><Link to='/login'>Login</Link> to view blogs</h4>
        )
      }
    </div>
  );
};

export default Home;
