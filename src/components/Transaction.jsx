import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import logo from '../logo.svg';
import './Restaurant.css';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useDbData, useDbUpdate } from '../utils/firebase';


const Transaction = ({ transaction, restaurant }) => {
    //   let navigate = useNavigate();

    return (
        <div className='transaction'>
            <Link to={`/${restaurant.id}`} style={{ textDecoration: 'none' }}>

                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Card.Section>
                        <Image
                            src={restaurant.profile.photo}
                            height={160}

                            alt="Restaurant image"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>{restaurant.profile.name}</Text>
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