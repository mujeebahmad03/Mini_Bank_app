/* eslint-disable react/prop-types */
import '../styles/History.css'

function History({ currentUser, formatCur, formatMovementDate }) {
  // Create an array of objects that includes movement, date, and formatted date
    const transactionData = currentUser.movements.map((movement, index) => {
        const date = new Date(currentUser.movementsDates[index]);
        const formattedDate = formatMovementDate(date, currentUser.locale);

        return {
        movement,
        date,
        formattedDate,
        };
    });

    // Sort the transaction data by date in descending order
    const sortedTransactions = transactionData.sort((a, b) => b.date - a.date);

    return (
        <div className="movements">
        {sortedTransactions.map((transaction, index) => (
            <div className="movements__row" key={index}>
            <p
                className={`movements__type movements__type--${
                transaction.movement > 0 ? 'deposit' : 'withdrawal'
                }`}
            >
                {transaction.movement > 0 ? 'Deposit' : 'Withdrawal'}
            </p>
            <p className="movements__date">{transaction.formattedDate}</p>
            <p className="movements__value">
                {formatCur(
                transaction.movement,
                currentUser.locale,
                currentUser.currency
                )}
            </p>
            </div>
        ))}
        </div>
    );
}

export default History;
