import Restaurant from "./Restaurant";
import { useState } from 'react';
import { Card, Image, Text, Badge, Drawer, Group } from '@mantine/core';
import QuantitySelector from "./QuantitySelector";
import { useDbUpdate } from "../utils/firebase";
import './MenuItem.css';


const ItemDetails = ({ menu_item, setCart, cart, setItemDetails }) => {
    const id = 0////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TODO: Hardcoded user ID
    const [updateOrder, result] = useDbUpdate(`/users/${id}/cart/`);
    const [quantity, setQuantity] = useState(0);

    const addToCart = () => {

        let form = useForm({
            initialValues: {
                restaurant: restaurant.id,
                orders: {}
            },
        });
        let orders = Object.keys(cart).filter((key, index) => cart[key].quantity > 0).map((key, index) => ({
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
        list[menu_item.id] = num ////////////////////////////////////// FIX THIS, CURRENTLY REFERENCING SECTION ID AND MENU ITEM ID, BUT WILL ONLY NEED TO DO MENU ITEM ID WHEN THEY'RE UNIQUE
        setCart(list)
    }

    return (
        <Drawer
            opened={menu_item}
            onClose={() => setItemDetails(null)}
            title="Item Details"
            position="bottom"
            size="93%"
        >
            <div className="menu-item">
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
                <Button className="submit-button" onClick={addToCart}>Check Out Order</Button>
            </div>
        </Drawer>
    );
};

export default ItemDetails;
