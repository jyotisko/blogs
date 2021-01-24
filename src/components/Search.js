import { useState } from 'react';
import { CORS_PROXY_SERVER_URL } from '../globals';
import BlogList from './BlogList';

const Search = () => {

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('title');
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (query === '') return;
    setLoading(true);

    try {
      const url = `${CORS_PROXY_SERVER_URL}https://blog-api-jyotisko.herokuapp.com/api/v1/blogs?${filter}=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className='search-container'>
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder='Search' />
        <select onChange={e => setFilter(e.target.value)}>
          <option value='title'>Title</option>
          <option value='body'>Body</option>
          <option value='author'>Author</option>
        </select>
      </form>
      <div>
        {
          loading && <div>Loading...</div>
        }
        {
          blogs && <BlogList title='Search' blogs={blogs} />
        }
        {
          error && <div>Something went wrong. Failed to fetch...</div>
        }
      </div>
    </div>
  );
}

export default Search;