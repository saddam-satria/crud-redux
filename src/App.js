import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './routes';
import Users from './routes/users';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from './action/users'


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={Users} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
