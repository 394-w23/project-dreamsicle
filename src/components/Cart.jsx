import React, { useState } from 'react';
import { Button, Text, Group, Modal, Table, Drawer, useMantineTheme, Title, Checkbox, Radio } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { menuItemParser } from '../utils/helper';
import OrderTable from './OrderTable';



export default function Cart({ restaurant, cartData, setCartData, updateOrders, setDrawerState }) {
  const theme = useMantineTheme();
  const [wantReturnableItems, setWantReturnableItems] = useState("No")

  const restaurantDetailsHelper = menuItemParser


  let rows = []

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

  const gotoCheckout = () => {
    setDrawerState("checkout") //  /////////////////////////////////////////////////////////////// also, the id nested within the item of the order is different than the name of the order
  }
  const removeOrder = (order) => {
    let tempCart = cartData
    console.log("Befor", tempCart.orders)
    delete tempCart.orders[order.id]
    console.log("Do something", tempCart.orders)
    console.log("Arf", tempCart.orders)
    setCartData(tempCart)
    // tempCart.orders[order.id] = null
    updateOrders({
      [order.id]: null,
    });
    if (cartData.orders.length === 0) {
      setDrawerState("")
    }
  }
  return (

    <div>
      <div className="table">
        <OrderTable deletable restaurant={restaurant} removeOrder={removeOrder} cartData={cartData} />
        <Button className="submit-button" style={{ marginTop: 20 }} onClick={gotoCheckout}>Go to checkout</Button>
      </div>
    </div>

  )
}
