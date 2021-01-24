import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {

  const { id } = useParams();
  const history = useHistory();
  const [blog, setBlog] = useState();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const url = `https://blog-api-jyotisko.herokuapp.com/api/v1/blogs/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setLoading(false);
        setBlog(data);
        setTitle(data.blog.title);
        setBody(data.blog.body);
        setAuthor(data.blog.author);
      } catch (err) {
        setError(true);
      }
    })();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (!title || !body || !author) return;
      setLoading(true);
      const newBlogData = {
        title: title,
        body: body,
        author: author
      }
      const data = await fetch(`https://blog-api-jyotisko.herokuapp.com/api/v1/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(newBlogData),
        body: JSON.stringify(newBlogData),
      });
      if (!data.ok) throw new Error('Something went wrong');
      else {
        setError(false);
        history.push('/');
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      {
        blog && (
          <div className='create'>
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
              <label>Blog Title: </label>
              <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
              <label>Blog Body: </label>
              <textarea style={{ resize: 'vertical' }} type='text' value={body} onChange={e => setBody(e.target.value)} />
              <label>Blog Author: </label>
              <input type='text' value={author} onChange={e => setAuthor(e.target.value)} />
              <button type='submit'>Edit Changes</button>
            </form>
          </div>
        )
      }
      {
        error && <div>Something went wrong. Failed to fetch...</div>
      }
      {
        loading && <div>Loading...</div>
      }
    </div>
  );
}

export default Edit;