/* eslint-disable react/prop-types */
import { useState } from "react";

function TransferOp({accounts, currentUser, setAccounts, setCurrentUser}) {
    const [transfer, setTransfer] = useState({amount: '', username: ''});

    const handleTransferChange = (event) => {
      const {name, value} = event.target
      setTransfer(prevTransfer => {
      return { ...prevTransfer, [name]: value}
  })
  }
  const handleTransfer = (e) => {
    e.preventDefault();

    // Check if the 'transferTo' username exists
    const toAccount = accounts.find((account) => account.username === transfer.username);

    if (!toAccount || toAccount === currentUser) {
    // Handle invalid transfer (e.g., user not found or trying to transfer to self)
  alert('User not found');
    return;
    }

    const amount = parseFloat(transfer.amount);

    if (isNaN(amount) || amount > currentUser.movements.reduce((acc, mov) => acc + mov, 0)) {
    // Handle invalid amount
    alert('Insufficient funds');
    return;
    }

    // Perform the transfer
    currentUser.movements.push(-amount);
    toAccount.movements.push(amount);
    currentUser.movementsDates.push(new Date().toISOString());
    toAccount.movementsDates.push(new Date().toISOString());

    // Update state or perform other necessary actions
    setCurrentUser(currentUser)
    setAccounts(prevAccounts => [...prevAccounts, toAccount])

      // Update local storage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Reset the input fields
    setTransfer({amount: '', username: ''});
};
    
    return (
      <div className="operation operation--transfer">
        <h2>Transfer money</h2>
        <form className="form form--transfer" onSubmit={handleTransfer}>
        <input type="text" 
            name='username'
            className="form__input form__input--to"
            value={transfer.username}
            onChange={handleTransferChange}
            />
        <input type="number" className="form__input form__input--amount" 
            name='amount'
            value={transfer.amount}
            onChange={handleTransferChange}
            min={1}
            />
        <button className="form__btn form__btn--transfer">&rarr;</button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
        </form>
      </div>
    )
}

export default TransferOp