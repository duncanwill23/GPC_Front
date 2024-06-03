import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './login/login';
import Main from './mainPage/main';
import AdminPanel from './mainPage/AdminPanel';
import ProtectedRoute from './login/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // Handle authentication state changes

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsAdmin(true);
  };

  return (
    <Router>
      <Switch>
        <Route 
          path="/login" 
          render={(props) => (
            isAuthenticated ? <Redirect to={isAdmin ? "/admin" : "/main"} /> : <Login {...props} onLogin={handleLogin} />
          )} 
        />
        <ProtectedRoute
          path="/main"
          component={Main}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/admin"
          component={AdminPanel}
          isAuthenticated={isAuthenticated && isAdmin}
          />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;



