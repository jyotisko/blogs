import { useEffect, useState } from 'react';
import BlogList from './BlogList';

const RecommendBlog = ({ currentBlogID }) => {

  const [blog, setBlog] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}blogs`);
      const data = await res.json();
      const filteredData = data.blogs.filter(blog => blog._id !== currentBlogID);
      const randomBlog = filteredData[Math.floor(Math.random() * filteredData.length)];
      setBlog(randomBlog);
    })();
  }, [currentBlogID]);

  return (
    <>
      {blog && (
        <section className='recommended'>
          <BlogList blogs={[blog]} title='Also Read!' />
        </section>
      )}
    </>
  );
}

export default RecommendBlog;
