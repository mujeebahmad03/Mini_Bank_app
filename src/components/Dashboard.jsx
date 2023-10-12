/* eslint-disable react/prop-types */
import Balance from './Balance';
import History from './History';
import Summary from './Summary';
import Operations from './Operations';
import '../styles/Dashboard.css';


export default function Dashboard({accounts, currentUser, setCurrentUser, setAccounts}) {

    const formatMovementDate = function (date, locale) {
        const calcDaysPassed = (date1, date2) =>
            Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
        const daysPassed = calcDaysPassed(new Date(), date);
        // console.log(daysPassed);

        if (daysPassed === 0) return "Today";
        if (daysPassed === 1) return "Yesterday";
        if (daysPassed <= 7) return `${daysPassed} days ago`;

        return new Intl.DateTimeFormat(locale).format(date);
    };

    const formatCur = function (value, locale, currency) {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
        }).format(value);
    };

    const calcBalance = function (currentUser) {
        const balance = currentUser.movements.reduce((acc, mov) => acc + mov, 0);
        return formatCur(balance, currentUser.locale, currentUser.currency);
    };



    return (
        <main className="dashboard">
            <Balance currentUser={currentUser} 
                balance={calcBalance}
                formatMovementDate={formatMovementDate}
                />
            <History
                currentUser={currentUser}
                formatMovementDate={formatMovementDate} // Pass the function as a prop
                formatCur={formatCur} // Pass the function as a prop
                />
            <Summary currentUser={currentUser} formatCur={formatCur} />

            <Operations 
                accounts={accounts}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} 
                setAccounts={setAccounts}
                />
        </main>
        );
        
}
