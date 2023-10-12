/* eslint-disable react/prop-types */
import '../styles/Balance.css'

function Balance({currentUser, balance}) {
    const total = balance(currentUser)
    const today = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    //   weekday: 'long',
    };

    const formatDate= new Intl.DateTimeFormat(currentUser.locale,options).format(today);
    
    return (
            <div className="balance">
                <div>
                <p className="balance__label">Current balance</p>
                <p className="balance__date">
                    As of <span className="date">{formatDate}</span>
                </p>
                </div>
                <p className="balance__value">{total}</p>
            </div>
    )
}

export default Balance