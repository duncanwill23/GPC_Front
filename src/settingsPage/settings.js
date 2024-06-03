import React, { useState, useEffect } from 'react';
import styles from './settings.module.css';

function MyComponent() {
  const [data, setData] = useState(null);
  const [emailList, setEmailList] = useState(false);
  const [email, setEmail] = useState('');
  const [offsetAccount, setOffsetAccount] = useState('');

  useEffect(() => {
    setData([
      { id: 1, name: 'User 1', hasSubAccounts: true, offsetAccount: "9958",  email: '', shortInt: '', div: '', emailList: true },
      { id: 2, name: 'User 2', hasSubAccounts: false, email: '', shortInt: '', div: '', emailList: false },
      { id: 3, name: 'User 3', hasSubAccounts: true, email: '', offsetAccount: "9956", shortInt: '', div: '', emailList: true },
    ]);
    // Use fetch here if you want to retrieve data from backend
  }, []);

  // Initialize emailList state based on the first item in the data array
  useEffect(() => {
    if (!data) return;
    for (let i = 0; i < data.length; i++) {
      if (data[i].emailList) {
        setEmailList(true);
        break;
      }
    }
  }, [data]);

  const handleCheckboxChange = (event, itemId) => {
    // change email state and data state based on the checkbox value
    setEmailList(event.target.checked);
    const updatedData = data.map((item) =>
        item.id === itemId ? { ...item, emailList: event.target.checked } : item
    );
    setData(updatedData);
    console.log('Checkbox changed for item:', itemId, 'New checkbox value:', event.target.checked);
  };

  const handleEmailChange = (event, itemId) => {
    // Implement your logic to handle email input change
    console.log('Email changed for item:', itemId, 'New email:', event.target.value);
  };

  const handleShortIntChange = (event, itemId) => {
    // Implement your logic to handle short interest input change
    console.log('Short Interest changed for item:', itemId, 'New short interest:', event.target.value);
  };

  const handleDivChange = (event, itemId) => {
    // Implement your logic to handle div input change
    console.log('DIV entries changed for item:', itemId, 'New DIV entries:', event.target.value);
  };

  return (
    <div>
      {data ? (
        <ul className={styles['list-item']}>
          {data.map(item => (
            <div key={item.id} className="list-item">
              <li>{item.name}</li>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, item.id)}
                  checked={item.emailList}
                />
                Daily Email
              </label>
              {item.hasSubAccounts ? (
                <div>
                  <span> || Sub-accounts: Yes || </span>
                  <li>
                    Offset Account:
                  {item.offsetAccount}
                  </li>
                </div>

              ) : (
                <span> || Sub-accounts: No || </span>
              )}
              <input
                type="text"
                className="email-input"
                placeholder="Enter email"
                onChange={(event) => handleEmailChange(event, item.id)}
              />
            </div>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;
