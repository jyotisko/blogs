import { Link } from 'react-router-dom';

const BlogList = ({ blogs, title }) => {
  return (
    <div className='blog-list'>
      <h1 className='blog-list-title'>{blogs.length > 0 ? title : 'No Blogs Found'}</h1>
      {blogs.length > 0 &&
        blogs.map(blog => (
          <div className='blog-preview' key={blog.id}>
            <Link to={`/blogs/${blog._id}`}>
              <h2>{blog.title}</h2>
              <p>Written By {blog.author}</p>
            </Link>
          </div>
        ))
      }
    </div>
  );
}

export default BlogList;