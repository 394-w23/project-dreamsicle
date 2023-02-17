import Restaurant from "./Restaurant";
import { useState } from 'react';
import { Card, Image, Text, Badge, Drawer, Group, Button } from '@mantine/core';
import QuantitySelector from "./QuantitySelector";
import { useDbUpdate } from "../utils/firebase";
import './MenuItem.css';
import { useForm } from "@mantine/form";


const ItemDetails = ({ updateOrders, itemDetails, itemDetailsOpened, setItemDetailsOpened, setCartData, cart, setItemDetails }) => {
    const id = 0 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TODO: Hardcoded user ID

    const [quantity, setQuantity] = useState(0);

    const addToCart = () => {
        let orders = Object.keys(cart.orders).filter((key, index) => cart[key].quantity > 0).map((key, index) => ({
            id: uuid(), item: key, quantity: cart[key]
        }));

        let ordersObject = {}
        orders.forEach(order => ordersObject[order.id] = order)

        // if there are any orders to submit, we should submit; otherwise do nothing
        if (orders.length > 0) {
            let formData = { ...form.values, datetime: moment().format(), id: transactionID, orders: ordersObject }
            updateOrder(formData)
        }

    }
    const updateCart = (num) => {
        setQuantity(num)
        let list = cart

        //TODO: Fix this
        list[itemDetails.id] = num ////////////////////////////////////// FIX THIS, CURRENTLY REFERENCING SECTION ID AND MENU ITEM ID, BUT WILL ONLY NEED TO DO MENU ITEM ID WHEN THEY'RE UNIQUE
        setCartData(list)
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
                        <QuantitySelector setQuantity={updateCart} quantity={quantity} />
                    </Group>
                    <Text position="right">Subtotal: ${(isNaN(cart[itemDetails.id]) ? 0 : cart[itemDetails.id]) * itemDetails.price}</Text>
                </Card>
                <Button className="submit-button" onClick={addToCart}>Add To Cart</Button>
            </div>
        </Drawer>
    );
};

export default ItemDetails;
