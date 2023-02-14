import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import logo from '../logo.svg';
import './Restaurant.css';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';


const QuantitySelector = ({ setQuantity }) => {
    const { number } = useParams();
    const [count, setCount] = useState(0);
    const onClick = () => {
        setRestaurant(restaurant);
        setRestaurantID(restaurant.id)
    };
    const add = () => {
        setQuantity(count + 1)
        setCount(count + 1)
    };
    const subtract = () => {
        setQuantity(count > 0 ? count - 1 : 0)
        setCount(count > 0 ? count - 1 : 0)   
    };

    return (
        <div>
       <Button onClick={add}>+</Button> 
       <div>{count}</div>
       <Button onClick={subtract}>-</Button>
       </div>
    );
}

export default QuantitySelector;