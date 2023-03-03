import Restaurant from "./Restaurant";
import { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import QuantitySelector from "./QuantitySelector";
import './MenuItem.css';


const MenuItem = ({ menu_item, setCartData, cartData, setItemDetails, setItemDetailsOpened }) => {
  const openItemDetails = () => {
    setItemDetails(menu_item);
    setItemDetailsOpened(true);
  };

  let placeholderImage = "https://theme-assets.getbento.com/sensei/f9c493b.sensei/assets/images/catering-item-placeholder-704x520.png";


  return (<div className="menu-item" onClick={openItemDetails}>
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={menu_item.photo !== "n/a"? menu_item.photo : placeholderImage}
          height={160}
          alt="Menu item image"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{menu_item.name}</Text>
        <Text weight={500}>${menu_item.price}</Text>
      </Group>

      {/* <Group position="apart" mt="md" mb="xs">
        <Text>
          {menu_item.servings} servings</Text>
        <QuantitySelector setQuantity={updateCart} quantity={quantity} />
      </Group>
      <Text position="right">Subtotal: ${(isNaN(cart[menu_item.id]) ? 0 : cart[menu_item.id]) * menu_item.price}</Text> */}
    </Card>
  </div>
  );
};

export default MenuItem;
