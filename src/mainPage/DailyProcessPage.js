import React, { useState } from 'react';

const DailyProcessPage = () => {
  const [processes, setProcesses] = useState([
    { id: 1, name: 'Process 1', status: 'completed' },
    { id: 2, name: 'Process 2', status: 'pending' },
    { id: 3, name: 'Process 3', status: 'failed' },
  ]);

  const handleRerun = (id) => {
    // Logic to rerun the process with the given id
    const updatedProcesses = processes.map((process) =>
      process.id === id ? { ...process, status: 'pending' } : process
    );
    setProcesses(updatedProcesses);
  };

  return (
    <div>
      <h2>Daily Processes</h2>
      <button onClick={() => handleRerun(2)}>Rerun Process 2</button>
      <ul>
        {processes.map((process) => (
          <li key={process.id}>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor:
                  process.status === 'completed'
                    ? 'green'
                    : process.status === 'pending'
                    ? 'yellow'
                    : 'red',
                marginRight: '5px',
              }}
            ></span>
            {process.name} - {process.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyProcessPage;

