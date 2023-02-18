import Restaurant from "./Restaurant";
import { useState } from 'react';
import { Card, Image, Text, Badge, Drawer, Group, Button } from '@mantine/core';
import QuantitySelector from "./QuantitySelector";
import { useDbUpdate } from "../utils/firebase";
import './MenuItem.css';
import { useForm } from "@mantine/form";
import uuid from 'react-uuid';


const ItemDetails = ({ updateOrders, itemDetails, itemDetailsOpened, setItemDetailsOpened, setCartData, cartData, setItemDetails }) => {
    const id = 0 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TODO: Hardcoded user ID
    const [quantity, setQuantity] = useState(0);

    const addToCart = () => {
        const new_uuid=uuid();
        // console.log("quantity before new_order",quantity)
        const new_order={id: new_uuid, item: itemDetails.id, quantity: quantity}
        if (cartData.orders) {
            // append to existing orders
            const new_data={...cartData, orders: {...cartData.orders,[new_uuid]:new_order}};
            // console.log("new_data to existing orders",new_data)
            setCartData(new_data)
            updateOrders({...cartData.orders,[new_uuid]:new_order})
        } else {
            // create new orders attribute thingy
            const new_data={...cartData, orders: {[new_uuid]:new_order}}
            // console.log("new_data to nonexisting orders",new_data)
            setCartData(new_data)
            updateOrders({[new_uuid]:new_order})
        }
        // console.log(cartData.orders)
        setQuantity(0)
        setItemDetailsOpened(false)
    }
    
    return (
        <Drawer
            opened={itemDetailsOpened}
            onClose={() => setItemDetailsOpened(false)}
            title="Item Details"
            position="bottom"
            size="93%"
        >
            <div className="menu-item">
                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Card.Section>
                        <Image
                            src={itemDetails.photo}
                            height={160}
                            alt="Menu item image"
                        />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>{itemDetails.name}</Text>
                        <Text weight={500}>${itemDetails.price}</Text>
                    </Group>

                    <Group position="apart" mt="md" mb="xs">
                        <Text>
                            {itemDetails.servings} servings</Text>
                        <QuantitySelector setQuantity={setQuantity} quantity={quantity} />
                    </Group>
                    <Text position="right">Subtotal: Nothing yet</Text>
                </Card>
                <Button className="submit-button" onClick={addToCart}>Add To Cart</Button>
            </div>
        </Drawer>
    );
};

export default ItemDetails;
