import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import BlogList from './BlogList';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from './../context/AuthContext';

const Search = () => {

  const user = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('title');
  const [blogs, setBlogs] = useState(null);
  const [amount, setAmount] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (query.trim() === '') return;

    let loadingToast;
    try {
      loadingToast = toast.loading('Fetching your blogs...');
      const res = await fetch(`${process.env.REACT_APP_API_URL}blogs?limit=${amount || '20'}&${filter}=${query.trim()}`);
      const data = await res.json();
      toast.dismiss(loadingToast);
      setBlogs(data.blogs);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong', { duration: 5000 });
    }
  };

  return (
    <>
      {user ? (
        <div className='search-container'>
          <form onSubmit={handleSubmit}>
            <input className='search-box' value={query} onChange={e => setQuery(e.target.value)} placeholder='Search' />
            <input className='input-amount' type='number' min='1' value={amount} onChange={e => setAmount(e.target.value)} placeholder='Amount' />
            <select onChange={e => setFilter(e.target.value)}>
              <option value='title'>Title</option>
              <option value='body'>Body</option>
              <option value='author'>Author</option>
              <option value='keywords'>Keywords</option>
            </select>
            <button className='search-btn' type='submit'>Search</button>
          </form>
          <div>
            {
              blogs && <BlogList title='Search' blogs={blogs} />
            }
          </div>
        </div>
      ) : (
        <h4 className='login-to-view'><Link to='/login'>Login</Link> and search for your favorite blogs!</h4>
      )}
      <Toaster toastOptions={{
        className: 'toast-element'
      }} position='bottom-center' />
    </>
  );
}

export default Search;