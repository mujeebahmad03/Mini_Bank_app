/* eslint-disable react/prop-types */
import { useState } from 'react';

function CloseOp({currentUser, accounts, setAccounts}) {
    const [closeAccount, setCloseAccount] = useState({ username: '', pin: ''});

    const handleCloseChange = (event) => {
        const {name, value} = event.target
        setCloseAccount(prevTransfer => {
        return { ...prevTransfer, [name]: value}
    })
    }


    const handleAccountClose = (e) => {
        e.preventDefault();
    
        if (
        closeAccount.username === currentUser.username &&
        +closeAccount.pin === currentUser.pin
        ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currentUser.username
        );
        console.log(index);
    
        // Delete account
        if (index !== -1) {
            // Create a copy of the accounts array without the closed account
            const updatedAccounts = [...accounts];
            updatedAccounts.splice(index, 1);

            // Update the accounts state
            setAccounts(updatedAccounts);

            // Clear user data from local storage
            localStorage.removeItem('currentUser');
            localStorage.removeItem('accounts');
            }
        }
    
        setCloseAccount({ username: '', pin: ''})
    };


    return (
        <div className="operation operation--close">
            <h2>Close account</h2>
            <form className="form form--close" onSubmit={handleAccountClose}>
                <input type="text" 
                    name='username'
                    value={closeAccount.username}
                    onChange={handleCloseChange}
                    className="form__input form__input--user" />
                <input
                    type="password"
                    maxLength="4"
                    className="form__input form__input--pin"
                    name='pin'
                    onChange={handleCloseChange}
                    value={closeAccount.pin}
                />
                <button className="form__btn form__btn--close">&rarr;</button>
                <label className="form__label">Confirm user</label>
                <label className="form__label">Confirm PIN</label>
            </form>
        </div>
    )
}

export default CloseOp