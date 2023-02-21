import React, { useState } from 'react';
import { Button, Text, Group, Modal, Table, Drawer, useMantineTheme, Title, Checkbox, Radio } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { menuItemParser } from '../utils/helper';
import OrderTable from './OrderTable';



export default function Cart({ restaurant, cartData, updateOrders, setDrawerState }) {
  const theme = useMantineTheme();
  const [wantReturnableItems, setWantReturnableItems] = useState("No")

  const restaurantDetailsHelper = menuItemParser


  let rows = []

  console.log(cartData.orders, " =-------- ", restaurant)
  if (cartData.orders) {



    rows = Object.values(cartData.orders).map((order) => {
      let item = restaurantDetailsHelper(order, restaurant);
      console.log("item", item)
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
    console.log(rows)
  }

  const gotoCheckout = () => {
    setDrawerState("checkout") //  /////////////////////////////////////////////////////////////// also, the id nested within the item of the order is different than the name of the order
  }
  return (

    <div>
      <div className="table">
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quanity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody><OrderTable cartData={cartData}/></tbody>
        </Table>
      <Button className="submit-button" style={{ marginTop: 20 }} onClick={gotoCheckout}>Go to checkout</Button>
      </div>
    </div>

  )
}
