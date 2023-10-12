/* eslint-disable react/prop-types */
// import React from 'react'; // Import React
import '../styles/Header.css';


function Header({ accounts, loginInfo, handleChange, handleLogin, currentUser, setLoginInfo}) {

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginInfo.isLogin) {
        // Handle logout here
        setLoginInfo({ username: '', pin: '', isLogin: false });

        } else {
        const currentUser = accounts.find((acc) => acc.username === loginInfo.username);
        if (currentUser?.pin === +loginInfo.pin) {
            // Call the handleLogin function with the current user
            handleLogin(currentUser);

            // Clear the input fields
            setLoginInfo({ username: '', pin: '', isLogin: true });
        }
        }
    }

    return (
        <nav>
        {loginInfo.isLogin ? (
            <p className="welcome">Welcome, {currentUser.owner.split(' ')[0]}!</p>
        ) : (
            <p className="welcome">Log in to get started</p>
        )}
        <img src="/logo.png" alt="Logo" className="logo" />
        <form onSubmit={handleLoginSubmit}>
            {loginInfo.isLogin ? (
            <button type="submit" className="login__btn">
                Logout
            </button>
            ) : (
            <>
                <input
                type="text"
                placeholder="user"
                className="login__input login__input--user"
                onChange={handleChange}
                name="username"
                value={loginInfo.username}
                />
                <input
                type="password"
                placeholder="PIN"
                maxLength="4"
                className="login__input login__input--pin"
                onChange={handleChange}
                name="pin"
                value={loginInfo.pin}
                />
                <button type="submit" className="login__btn">
                &rarr;
                </button>
            </>
            )}
        </form>
        </nav>
    );
}

export default Header;