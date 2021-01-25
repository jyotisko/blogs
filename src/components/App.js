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
            <Route path='/' exact>
              <Home user={user} />
            </Route>
            <Route path='/create'>
              <Create user={user} />
            </Route>
            <Route path='/blogs/:id'>
              <BlogDetails user={user} />
            </Route>
            <Route path='/search'>
              <Search user={user} />
            </Route>
            <Route path='/edit/:id'>
              <Edit user={user} />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
