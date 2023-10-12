/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { accountData } from './data';

function App() {
  const [accounts, setAccounts] = useState(accountData);
  const [loginInfo, setLoginInfo] = useState({ username: '', pin: '', isLogin: false });
  const [currentUser, setCurrentUser] = useState(null);

  // Define a function to set the current user when logged in
  const handleLogin = (user) => {
    setCurrentUser(user);
    setLoginInfo((prevLoginInfo) => {
      return { ...prevLoginInfo, isLogin: true }; // Set isLogin to true
    });

    // Save user data to local storage
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }

  // Check if user data exists in local storage and retrieve it
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedAccounts = localStorage.getItem('accounts');

    if (storedUser && storedAccounts) {
      setCurrentUser(JSON.parse(storedUser));
      setAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  // Define a function to handle changes in the login input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prevLoginInfo => {
      return { ...prevLoginInfo, [name]: value }
    });
  }

  return (
    <div>
        <Header
          accounts={accounts}
          loginInfo={loginInfo}
          handleLogin={handleLogin}
          handleChange={handleChange}
          currentUser={currentUser}
          setLoginInfo={setLoginInfo}
          />
        {loginInfo.isLogin && (<Dashboard 
          accounts={accounts}
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser} // Pass the callback function
          setAccounts={setAccounts} // Pass the callback function
          />)}
      
    </div>
  );
}

export default App;
