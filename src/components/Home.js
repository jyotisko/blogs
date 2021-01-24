import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from '../useFetch';

const Home = () => {

  const [blogs, isPending, error] = useFetch('https://blog-api-jyotisko.herokuapp.com/api/v1/blogs');

  return (
    <div className='home'>
      {error && 'Something went wrong :('}
      {isPending ? <div>Loading...</div> : ''}
      {blogs && <BlogList blogs={blogs} title='All Blogs!' />}
    </div>
  );
};

export default Home;
