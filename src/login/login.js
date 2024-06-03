import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const [users, setUsers] = useState([]);

  // Load users from local storage on initial render
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      console.log('Login successful');
      if (user.role === 'admin') {
        onLogin(true, true); // onLogin(isAuthenticated, isAdmin)
        history.push('/admin');
      } else {
        onLogin(true, false);
        history.push('/main');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className='titleLogin'>
        <img src={process.env.PUBLIC_URL + '/gpcLogo.png'} alt='GreatPointCapital' className='logo' />
        <h2>Great Point Capital</h2>
      </div>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Login;

