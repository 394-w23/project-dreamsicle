import { useRef, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import logo from '../logo.svg';
import './Restaurant.css';
import { Button, NumberInput, Group, ActionIcon } from '@mantine/core';


const QuantitySelector = ({ quantity, setQuantity }) => {
  const { number } = useParams();
  const add = () => {
    setQuantity(isNaN(quantity) ? 1 : quantity + 1)
  };
  const subtract = () => {
    setQuantity(quantity > 10 ? quantity - 1 : 10)
  };

  return (
    <div>
      <Group spacing={5}>
        <ActionIcon  size={36} variant="default" onClick={() => subtract()}>
          -
        </ActionIcon>

        <NumberInput
          hideControls
          value={quantity}
          onChange={(quantity) => setQuantity(quantity)}
          // handlersRef={handlers}
          min={0}
          styles={{ input: { width: '54px', textAlign: 'center' } }}
        />
        <ActionIcon size={36} variant="default" onClick={() => add()}>
          +
        </ActionIcon>
      </Group>
    </div>
  );
}

export default QuantitySelector;