import { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogList from './BlogList';

const Search = ({ user }) => {

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
      const url = `https://blog-api-jyotisko.herokuapp.com/api/v1/blogs?${filter}=${query}`;
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
    <>
      {user ? (
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
      ) : (
          <h4><Link to='/login'>Login</Link> and search for your favorite blogs!</h4>
        )}

    </>
  );
}

export default Search;