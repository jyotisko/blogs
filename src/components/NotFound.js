import NotFoundIcon from '../assets/notFound.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found'>
      <img src={NotFoundIcon} alt='Not Found' />
      <h2>Looks like you are lost...</h2>
      <h4>Go to <Link to='/'>Home</Link> page?</h4>
    </div>
  );
}

export default NotFound;