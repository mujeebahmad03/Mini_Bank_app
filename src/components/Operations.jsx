/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import TransferOp from './TransferOp';
import LoanOp from './LoanOp';
import CloseOp from './CloseOp';
import Timer from './Timer';
import '../styles/Operations.css';

function Operations({ currentUser, accounts, setCurrentUser, setAccounts }) {   

    return (
        <div className='operations'>
            {/* -- OPERATION: TRANSFER -- */}
            <TransferOp 
                accounts={accounts}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} 
                setAccounts={setAccounts}
                />
            
            {/* -- OPERATION: LOAN -- */}
            <LoanOp
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} 
                setAccounts={setAccounts}
                />

            {/* -- OPERATION: CLOSE -- */}
            <CloseOp
                currentUser={currentUser}
                accounts={accounts}
                setAccounts={setAccounts}
                />
            <Timer/>
        </div>
    )
}

export default Operations