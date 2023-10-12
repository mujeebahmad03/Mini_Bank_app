/* eslint-disable react/prop-types */
import { useState } from 'react';


export default function LoanOp({currentUser, setCurrentUser, setAccounts}) {
  const [loanAmount, setLoanAmount] = useState('');

  const handleLoanRequest = (e) => {
    e.preventDefault();
    
    // Check if the requested loan amount is valid
    const requestedLoan = parseFloat(loanAmount);
    
    if (isNaN(requestedLoan) || requestedLoan <= 0) {
        // Handle invalid loan request
        console.log('Invalid loan request');
        return;
    }
    setTimeout(function () {
        // Add movement
        currentUser.movements.push(requestedLoan);

        // Add loan date
        currentUser.movementsDates.push(new Date().toISOString());

        // Update state
        setCurrentUser(currentUser);
        setAccounts(prevAccounts => [...prevAccounts, currentUser])
        // console.log(currentUser)

          // Update local storage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));


    }, 2500);
    
    // Reset the input field
    setLoanAmount('');
};
  return (
    <div className="operation operation--loan">
        <h2>Request loan</h2>
        <form className="form form--loan" onSubmit={handleLoanRequest}>
        <input type="number" 
            min={1}
            className="form__input form__input--loan-amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            />
        <button className="form__btn form__btn--loan">&rarr;</button>
        <label className="form__label form__label--loan">Amount</label>
        </form>
    </div>
  )
}
