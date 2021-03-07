import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AuthorInfo = ({ user }) => {

  const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const { uid } = useParams();
  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    (async () => {
      let loadingToast;
      try {
        loadingToast = toast.loading('Fetching Author Data...');
        const res = await fetch(`${process.env.REACT_APP_API_URL}users/${uid}`);
        const data = await res.json();
        setAuthorInfo(data.user);
        toast.dismiss(loadingToast);

      } catch (err) {
        toast.dismiss(loadingToast);
        toast.error('Something went wrong...', { duration: 5000 });
      }
    })();
  }, [uid]);

  const getAccountCreationDate = dateString => {
    const date = new Date(dateString);
    const day = Number(date.getDay());
    const month = monthsArr[date.getMonth()];
    const year = date.getFullYear();

    let dayEndString;
    if (day === 1) dayEndString = 'st';
    else if (day === 2) dayEndString = 'nd';
    else if (day === 3) dayEndString = 'rd';
    else dayEndString = 'th';

    return `${day}${dayEndString} ${month} ${year}`;
  };

  return (
    <>
      { user ?
        (
          authorInfo && (
            <>
              <h2 className='about-the-author-heading'>About the author</h2>
              <div className='author-info-container'>
                <img src={authorInfo.profilePicUrl} alt={authorInfo.username} />
                <h1 className='author-name'>{authorInfo.username}</h1>
                <p className='about-the-author-para'>{authorInfo.bio}</p>
                <p className='member-since-para'>Member since {getAccountCreationDate(authorInfo.createdAt)}</p>
              </div>
            </>
          )
        ) : (
          <h4 className='login-to-view'><Link to='/login'>Login</Link> to view blog.</h4>
        )
      }
      <Toaster toastOptions={{
        className: 'toast-element'
      }} position='bottom-center' />
    </>
  );
}

export default AuthorInfo;