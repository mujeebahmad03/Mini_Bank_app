/* eslint-disable react/prop-types */
import '../styles/Summary.css';

export default function Summary({currentUser, formatCur}) {
    
    const incomes = currentUser.movements
        .filter((mov) => mov > 0)
        .reduce((currentUser, mov) => currentUser + mov, 0);
    const formattedIncome = formatCur(incomes, currentUser.locale, currentUser.currency);
    
    const expenses = currentUser.movements
        .filter((mov) => mov < 0)
        .reduce((currentUser, mov) => currentUser + mov, 0);
    const formattedExpenses=formatCur(Math.abs(expenses), currentUser.locale, currentUser.currency);
    
    const interest = currentUser.movements.filter((mov) => mov > 0)
        .map((deposit) => (deposit * currentUser.interestRate) / 100)
        .filter(int => {
        return int >= 1;})
        .reduce((currentUser, int) => currentUser + int, 0);
    const formattedInterest = formatCur(interest, currentUser.locale, currentUser.currency);

    return (
        <div className="summary">
            <p className="summary__label">In</p>
            <p className="summary__value summary__value--in">{formattedIncome}</p>
            <p className="summary__label">Out</p>
            <p className="summary__value summary__value--out">{formattedExpenses}</p>
            <p className="summary__label">Interest</p>
            <p className="summary__value summary__value--interest">{formattedInterest}</p>
        </div>
    )
}
