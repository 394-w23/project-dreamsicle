import Restaurant from "./Restaurant";
import { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import QuantitySelector from "./QuantitySelector";
import './MenuItem.css';


const MenuItem = ({ menu_item, setCart, cart, section_id }) => {
  const orderID = "10";
  // console.log(restaurant)

  const [quantity, setQuantity] = useState(0);

  const updateCart = (num) => {
    setQuantity(num)
    let list = cart
    
    //TODO: Fix this
    list[menu_item.id] = num ////////////////////////////////////// FIX THIS, CURRENTLY REFERENCING SECTION ID AND MENU ITEM ID, BUT WILL ONLY NEED TO DO MENU ITEM ID WHEN THEY'RE UNIQUE
    setCart(list)
  }

  return (<div className="menu-item">
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={menu_item.photo}
          height={160}
          alt="Menu item image"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{menu_item.name}</Text>
        <Text weight={500}>${menu_item.price}</Text>
      </Group>

      <Group position="apart" mt="md" mb="xs">
        <Text>
          {menu_item.servings} servings</Text>
        <QuantitySelector setQuantity={updateCart} quantity={quantity} />
      </Group>
      <Text position="right">Subtotal: ${(isNaN(cart[menu_item.id]) ? 0 : cart[menu_item.id]) * menu_item.price}</Text>
    </Card>
  </div>
  );
};

export default MenuItem;
