import NavBar from './NavBar';
import Home from './Home';
import Create from './Create';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Search from './Search';
import Edit from './Edit';
import Signup from './Signup';
import Login from './Login';
import Account from './Account';
import AuthorInfo from './AuthorInfo';
import Bookmarks from './Bookmarks';
import LearnToWriteBlog from './LearnToWriteBlog';
import { AuthProvider } from './../context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <div className='content'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/create' component={Create} />
              <Route path='/blogs/:id' component={BlogDetails} />
              <Route path='/search' component={Search} />
              <Route path='/edit/:id' component={Edit} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/account' component={Account} />
              <Route path='/user/:uid' component={AuthorInfo} />
              <Route path='/bookmarks' component={Bookmarks} />
              <Route path='/learn' component={LearnToWriteBlog} />
              <Route path='*' component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
