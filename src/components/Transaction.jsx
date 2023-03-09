import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import logo from '../logo.svg';
import './Transaction.css';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useDbData, useDbUpdate } from '../utils/firebase';
import { getTotalOrderPrice } from '../utils/helper';


const Transaction = ({ transaction, restaurant, recent }) => {
    //   let navigate = useNavigate();
    let total_price = getTotalOrderPrice(restaurant, transaction);


    return (
        <div className='transaction'>
            <Link to={`/orders/${restaurant.id}/${transaction.id}`} style={{ textDecoration: 'none' }}>

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


                {/*                
                <div className="">
                    <img className='photo' src={`${restaurant.profile.photo}`}></img>
                </div>
                <div className="details">


                    <div className='name'>{restaurant.profile.name}</div>
                 
                    <div className='notice'>Notice Time: 24 hrs</div>
                    <div className='person-range'>{restaurant.profile.lower_order_bound}-{restaurant.profile.upper_order_bound}</div>
                    <div onClick={onClick}>Click Me</div>

                </div> */}


            </Link>
        </div>);
}

export default Transaction;