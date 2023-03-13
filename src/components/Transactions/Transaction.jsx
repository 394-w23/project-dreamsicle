import { useEffect } from 'react';
import { Link} from "react-router-dom";
import './Transaction.css';
import { Card, Image, Text, Group } from '@mantine/core';
import { getTotalOrderPrice } from '../../utils/helper';
import { useTransactionStore } from '../../store/transactionsStore';


const Transaction = ({ transaction, restaurant, recent }) => {
    let total_price = getTotalOrderPrice(restaurant, transaction);

    const {latestTransaction, setLatestTransaction} =  useTransactionStore();

    useEffect(()=>{

    },[])
    

    const handleLatestTransaction = ()=> {
        if(recent){
            setLatestTransaction(transaction.id) // assuming that this id is always unique
        }
    }

    return (
        <div className='transaction'>
            <Link to={`/orders/${restaurant.id}/${transaction.id}`} style={{ textDecoration: 'none' }} onClick={handleLatestTransaction}>

                <Card className="transaction-card" shadow="sm" p="lg" radius="md" withBorder>
                    <Card.Section style={{ margin: "0px 20px 0px 0px" }}>
                        <Image
                            src={restaurant.profile.photo}
                            height={110}
                            width={110}
                            alt="Restaurant image"
                        />
                    </Card.Section>

                    <Group className="basic-order-info" position="apart" mt="md" mb="xs">
                        <div>
                            <Text className="basic-order-name" weight={500}>{restaurant.profile.name}</Text>
                            <Text size={12}>
                                {new Date(transaction.datetime).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}  
                                {"    ·   " + new Date(transaction.datetime).toLocaleTimeString('en-us', { hour: "2-digit", minute: "2-digit" })}
                            </Text>
                        </div>
                        {recent ? <Text>${(total_price + 50).toFixed(2)} (Including $50 deposit)</Text> :
                        <Text>${(total_price).toFixed(2) } </Text>}
                    </Group>
                </Card>


            </Link>
        </div>);
}

export default Transaction;