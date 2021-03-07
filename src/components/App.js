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
import { useState } from 'react';
import { app } from './../firebase';
import Account from './Account';
import AuthorInfo from './AuthorInfo';
import Bookmarks from './Bookmarks';
import LearnToWriteBlog from './LearnToWriteBlog';

function App() {

  const [user, setUser] = useState(false);

  app.auth().onAuthStateChanged(user => {
    if (!user) {
      setUser(false);
    }
    if (user) {
      setUser(true);
    }
  });

  return (
    <Router>
      <div className="App">
        <NavBar user={user} />
        <div className='content'>

          <Switch>
            <Route path='/' exact component={() => <Home user={user} />} />
            <Route path='/create' component={() => <Create user={user} />} />
            <Route path='/blogs/:id' component={() => <BlogDetails user={user} />} />
            <Route path='/search' component={() => <Search user={user} />} />
            <Route path='/edit/:id' component={() => <Edit user={user} />} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/account' component={() => <Account user={user} />} />
            <Route path='/user/:uid' component={() => <AuthorInfo user={user} />} />
            <Route path='/bookmarks' component={() => <Bookmarks user={user} />} />
            <Route path='/learn' component={LearnToWriteBlog} />
            <Route path='*' component={NotFound} />
          </Switch>

        </div>
      </div>
    </Router>
  );
}

export default App;
