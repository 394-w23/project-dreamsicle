import Restaurant from "./Restaurant";
import { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import QuantitySelector from "./QuantitySelector";


const MenuItem = ({ menu_item }) => {
  const orderID = "10";
  // console.log(restaurant)

  const [quantity, setQuantity] = useState(0);
    
  

  return (
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
      </Group>
      <QuantitySelector setQuantity={setQuantity} quantity={quantity}/> 
    </Card>

    // <Card>
    //   <div>{menu_item.name}</div>
    //   <div>{menu_item.servings} servings</div>
    //   <div>${menu_item.price}</div>
    //   <div>{menu_item.ingredients}</div>
    //   <img src={menu_item.photo}></img>
    // </Card>
  );
};

export default MenuItem;
