import { useEffect, useContext, useState } from 'react';
import BlogList from "./BlogList";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hooks/useFetch';
import { AuthContext } from './../context/AuthContext';

const Home = () => {

  const user = useContext(AuthContext);
  const limit = 50;
  const [page, setPage] = useState(1);
  const [data, isPending, error] = useFetch(`${process.env.REACT_APP_API_URL}blogs?page=${page}&limit=${limit}`);
  const maxPage = data && Math.ceil(data.totalResults / limit);

  useEffect(() => {
    let loadingToast;
    if (isPending) loadingToast = toast.loading('Loading...');
    else toast.dismiss(loadingToast);
  }, [isPending]);

  useEffect(() => {
    if (error) toast.error('Something went wrong...', { duration: 5000 });
  }, [error]);

  return (
    <div className='home'>
      {user ? (
        <>
          {data && (
            <>
              <BlogList blogs={data.blogs} title='All Blogs!' />
              <div className='paginate-btn-container'>
                {page === 1 || <button className='button-paginate button-left' onClick={() => setPage(page => page - 1)}>⬅</button>}
                {page === maxPage || <button className='button-paginate button-right' onClick={() => setPage(page => page + 1)}>➡</button>}
              </div>
            </>
          )}
        </>
      ) : (
        <h4 className='login-to-view'><Link to='/login'>Login</Link> to view blogs</h4>
      )
      }
      <Toaster toastOptions={{
        className: 'toast-element'
      }} position='bottom-center' />
    </div>
  );
};

export default Home;
