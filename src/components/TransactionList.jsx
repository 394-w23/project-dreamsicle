import Header from './Header';
import Navbar from './Navbar';
import { Button, NumberInput, Text, Title, TextInput } from '@mantine/core';
import Transaction from './Transaction';


const TransactionList = ({ transactions, restaurants }) => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    return (
        <div  >
            < Header  />

            <Title style={{ color: "black" }} >Orders</Title>
            <div  className='transaction-list'>
                {transactions.length > 0
                    ? transactions.sort((x, y) => (new Date(y.datetime)) - new Date(x.datetime)).map((transaction, index) => <Transaction key={transaction.id} recent={index === 0} transaction={transaction} restaurant={restaurants[transaction.restaurant]} />)
                    : <div style={{ marginTop: 100 }}>
                        <Title align='center'>No Order History</Title>
                    </div>
                }
            </div>

            <Navbar />
        </div>
    );

}

export default TransactionList;
