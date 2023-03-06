import React, { useState } from 'react';
import { Button, Text, Switch, Group, Modal, Table, Drawer, useMantineTheme, Title, Checkbox, Radio } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { menuItemParser } from '../utils/helper';
import OrderTable from './OrderTable';



export default function Cart({ restaurant, cartData, setCartData, updateOrders, setDrawerState }) {
  const restaurantDetailsHelper = menuItemParser
  const [checked, setChecked] = useState(true)

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
    console.log("length thing", cartData.orders.length)
    if (Object.values(cartData.orders).length === 0) {
      setDrawerState("")
    }
  }
  return (

    <div>
      <div className="table">
        <OrderTable deletable restaurant={restaurant} removeOrder={removeOrder} cartData={cartData} />
        <div className="reserve-question">
          <Text size="lg">Do you want to rent serveware?</Text>
          <Switch size="md" className="reserve-switch" onLabel="YES" offLabel="NO" checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} />
        </div>

        {checked &&
          <Checkbox.Group className="reserve-checkboxes"
            orientation='vertical'
            size="xs"
            defaultValue={['utensils', 'plates', 'platters']}>

            <Checkbox value="utensils" label="20 Utensil packs (fork, knife, spoon)" />
            <Checkbox value="plates" label="20 Plates" />
            <Checkbox value="platters" label="5 Serving platters" />
          </Checkbox.Group>}
        <Text className="disclaimer" color="#777777" size="xs">
          A $50 refundable deposit is required and will be chargeed to your credit card on file.
          In the event that all rental is not returned, you will be charged for the missing items.
        </Text>
        <div className="floating-submit-button" style={{bottom:"5%"}}>
          <Button style={{ marginTop: 20 }} onClick={gotoCheckout}>Go to checkout</Button>
        </div>
        <div style={{ height: "10vh" }}></div>

      </div>
    </div>

  )
}
