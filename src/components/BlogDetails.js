import { useHistory, useParams } from "react-router-dom";
import useFetch from '../useFetch';
import { CORS_PROXY_SERVER_URL } from '../globals';
import { Link } from 'react-router-dom';

const BlogDetails = () => {

  const { id } = useParams();

  const history = useHistory();

  const [blog, isPending, error] = useFetch(`https://blog-api-jyotisko.herokuapp.com/api/v1/blogs/${id}`);

  const deleteBlog = () => {
    fetch(`${CORS_PROXY_SERVER_URL}https://blog-api-jyotisko.herokuapp.com/api/v1/blogs/${id}`,
      { method: 'DELETE' }
    ).then(_ => history.push('/'));
  };

  return (
    <div className='blog-details'>
      {
        isPending && <div>Loading...</div>
      }
      {
        error && <div>{error}</div>
      }
      {
        blog && <article>
          <h2>{blog.blog.title}</h2>
          <p>Written by {blog.blog.author}</p>
          <div>{blog.blog.body}</div>
          <button onClick={deleteBlog} className='delete-blog'>Delete</button>
          <Link to={`/edit/${blog.blog._id}`}><button>Edit</button></Link>
        </article>
      }
    </div>
  );
}

export default BlogDetails;