import React, { useEffect, useState } from 'react';

const ErrorPanel = () => {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchErrors = async () => {
            try {
                const response = await fetch('https://your-backend-url/api/errors');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setErrors(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchErrors();

        // Optionally, refresh the error list every minute
        const intervalId = setInterval(fetchErrors, 60000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleUpdate = async (updatedError) => {
        try {
            const response = await fetch(`https://your-backend-url/api/errors/${updatedError.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedError),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedErrors = errors.map((error) =>
                error.id === updatedError.id ? updatedError : error
            );
            setErrors(updatedErrors);
        } catch (error) {
            console.error('Error updating error:', error);
        }
    };

    const handleChange = (id, field, value) => {
        const updatedErrors = errors.map((error) =>
            error.id === id ? { ...error, [field]: value } : error
        );
        setErrors(updatedErrors);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div id="error-panel" style={styles.panel}>
            <h3>Errors</h3>
            <div id="error-list">
                {errors.map((error) => (
                    <div key={error.id} className="error-item" style={styles.errorItem}>
                        <strong>ID:</strong> {error.id} <br />
                        <strong>Message:</strong>
                        <input
                            type="text"
                            value={error.message}
                            onChange={(e) => handleChange(error.id, 'message', e.target.value)}
                        />
                        <br />
                        <strong>Timestamp:</strong> {new Date(error.timestamp).toLocaleString()} <br />
                        <button onClick={() => handleUpdate(error)}>Update</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    panel: {
        border: '1px solid #ccc',
        padding: '10px',
        width: '300px',
        margin: '20px auto',
    },
    errorItem: {
        borderBottom: '1px solid #ddd',
        padding: '5px 0',
    },
};

export default ErrorPanel;
