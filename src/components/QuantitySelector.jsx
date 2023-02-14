import { useRef, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import logo from '../logo.svg';
import './Restaurant.css';
import { Button, NumberInput, Group, ActionIcon } from '@mantine/core';


const QuantitySelector = ({ quantity, setQuantity }) => {
    const { number } = useParams();

    const onClick = () => {
        setRestaurant(restaurant);
        setRestaurantID(restaurant.id)
    };
    const add = () => {
        setQuantity(quantity + 1)
        // setCount(count + 1)
    };
    const subtract = () => {
        setQuantity(quantity > 0 ? quantity - 1 : 0)
        // setCount(count > 0 ? count - 1 : 0)   
    };

    return (
        <div>
        <Group spacing={5}>
      <ActionIcon size={42} variant="default" onClick={() => subtract()}>
        -
      </ActionIcon>

      <NumberInput
        hideControls
        value={quantity}
        onChange={(val) => setQuantity(val)}
        // handlersRef={handlers}
        min={0}
        styles={{ input: { width: '54px', textAlign: 'center' } }}
      />
      <ActionIcon size={42} variant="default" onClick={() => add()}>
        +
      </ActionIcon>
    </Group>
       {/* <Button onClick={add}>+</Button> 
       <div>{count}</div>
       <Button onClick={subtract}>-</Button> */}
       </div>
    );
}

export default QuantitySelector;