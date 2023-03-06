import React, { useState } from 'react';
import uuid from 'react-uuid';
import { Button, Switch, Text, Group, Modal, Table, Drawer, useMantineTheme, Title, Checkbox, Radio } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useDbUpdate } from "../utils/firebase";
import { Link } from "react-router-dom";
import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import { FaLocationArrow } from "@react-icons/all-files/Fa/FaLocationArrow"
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { menuItemParser } from '../utils/helper';
import moment from 'moment';
import OrderTable from './OrderTable';


export default function Checkout({ restaurant, cartData, updateCart, setCartData, setDrawerState }) {
    const [wantReturnableItems, setWantReturnableItems] = useState("Yes")
    
    const transactionID = uuid();
    const [updateTransactions, result] = useDbUpdate(`/transactions/${transactionID}`);

    const restaurantDetailsHelper = menuItemParser

    let form = useForm({
        initialValues: {
            id: transactionID,
            datetime: "",
            restaurant: restaurant.id,
            user: 0, ////////////////////////////////////////////////////////////////// HARD CODED USER
            orders: {}
        },
    });

    let rows = []

    // console.log(cartData.orders, " =-------- ", restaurant)
    if (cartData.orders) {
        rows = Object.values(cartData.orders).map((order) => {
            let item = restaurantDetailsHelper(order, restaurant);
            return (
                <tr key={order.id}>
                    <td>{item.name}</td>
                    <td>{order.quantity}</td>
                    <td>${item.price * order.quantity}</td>
                    <td><Button compact variant="subtle"><FaTrash /></Button></td>
                </tr>
            )
        }
        )
    }

    const placeOrder = () => {
        setDrawerState("") //  /////////////////////////////////////////////////////////////// also, the id nested within the item of the order is different than the name of the order

        // if there are any orders to submit, we should submit; otherwise do nothing
        if (Object.values(cartData.orders).length > 0) {
            let formData = { ...form.values, datetime: moment().format(), id: transactionID, orders: cartData.orders }
            updateTransactions(formData)
            const newRestaurantCart = {
                restaurant: restaurant.id,
                orders: {}
            }
            updateCart(newRestaurantCart)
            setCartData(newRestaurantCart);
        }
        console.log("Checkout cart data length: -------", Object.values(cartData.orders).length > 0)


    }
    return (

        <div>
            <OrderTable restaurant={restaurant} cartData={cartData} />
            


            <div style={{ textAlign: "center", paddingTop: 40, paddingBottom: 40 }}>
                <FaLocationArrow />  Deliver to: 1234 Sheridan Rd, Evanston IL
            </div>
            <div style={{ textAlign: "center", paddingTop: 20 }}>
                <Title size="medium">Card on file</Title>
                <Cards
                    number={"1234123412341234"}
                    expiry={"04/19"}
                    cvc={"000"}
                    name={"Your Name"}
                    focused={"number"}
                    preview={true}
                    issuer={"Visa"}
                />
                <div className="floating-submit-button" style={{ bottom: "3%" }}>
                    <Link
                        to={`/orders/${restaurant.id}/${transactionID}`} //placeholder
                        style={{ textDecoration: "none" }}>
                        <Button style={{ marginTop: 20 }} onClick={placeOrder}>Place Order</Button>
                    </Link>
                </div>
                <div style={{ height: "15vh" }}></div>

            </div>
        </div>)
}
