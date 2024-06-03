import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    // Load users from local storage on initial render
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    // Save users to local storage
    const saveUsersToLocalStorage = (updatedUsers) => {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
        saveUsersToLocalStorage(updatedUsers);
    }

    const handleEditUser = (id) => {
        const user = users.find(user => user.id === id);
        setUsername(user.username);
        setPassword(user.password);
        setRole(user.role);
        handleDeleteUser(id);
    }

    const handleAddUser = () => {
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            username,
            password,
            role,
        };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        saveUsersToLocalStorage(updatedUsers);
        setUsername('');
        setPassword('');
        setRole('user');
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <h3>Add User</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Role:
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <button type="submit">Add User</button>
            </form>
            <h3>User List</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.role})
                        <button onClick={() => handleEditUser(user.id)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
