import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CORS_PROXY_SERVER_URL } from '../globals';

const DEFAULT_AUTHOR = 'mario';

const Create = () => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState(DEFAULT_AUTHOR);
  const [isPending, setIsPending] = useState(false);

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    setIsPending(true);
    const blog = { title, body, author };

    fetch(`${CORS_PROXY_SERVER_URL}https://blog-api-jyotisko.herokuapp.com/api/v1/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    }).then((data) => {
      console.log(data);
      setIsPending(false)
      setTitle('');
      setBody('');
      setAuthor(DEFAULT_AUTHOR);
      history.push('/');
    })
  };

  return (
    <div className='create'>
      <h2>Add a new blog</h2>

      <form onSubmit={handleSubmit}>

        <label>Blog Title: </label>
        <input
          type='text'
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label>Blog Body: </label>
        <textarea
          style={{
            resize: 'vertical'
          }}
          required
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>

        <label>Blog Author: </label>
        <select
          value={author}
          onChange={e => setAuthor(e.target.value)}
        >
          <option value='mario' defaultValue>Mario</option>
          <option value='yoshi'>Yoshi</option>
        </select>

        {!isPending && <button type='submit'>Add Blog</button>}
        {isPending && <button type='submit' disabled>Adding Blog</button>}
      </form>
    </div>
  );
}

export default Create;