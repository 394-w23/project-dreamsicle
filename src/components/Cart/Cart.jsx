import React, { useState } from 'react';
import { Button, Text, Switch, Checkbox } from "@mantine/core";
import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import 'react-credit-cards-2/es/styles-compiled.css';
import './Cart.css';
import OrderTable from '../Orders/OrderTable';
import { menuItemParser } from '../../utils/helper';

export default function Cart({ updateCart, restaurant, cartData, setCartData, updateOrders, setDrawerState }) {
  const restaurantDetailsHelper = menuItemParser
  const [checked, setChecked] = useState(true)
  const [utensils, setUtensils] = useState({utensils:['utensils', 'plates', 'platters']})

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

    setDrawerState("checkout") 
  }
  const removeOrder = (order) => {
    let tempCart = cartData
    delete tempCart.orders[order.id]
    setCartData(tempCart)
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
      </div>
      <div className="reserve-question">
        <Text size="lg">Do you want to rent serveware?</Text>
        <Switch size="md" className="reserve-switch" onLabel="YES" offLabel="NO" checked={checked} onChange={(event) => {
          setChecked(event.currentTarget.checked)
        }} />
      </div>
      {checked &&
        <Checkbox.Group className="reserve-checkboxes"
          orientation='vertical'
          size="xs"
          defaultValue={utensils.utensils}
          >
          <Checkbox value="utensils" label="20 Utensil packs (fork, knife, spoon)" />
          <Checkbox value="plates" label="20 Plates" />
          <Checkbox value="platters" label="5 Serving platters" />
        </Checkbox.Group>}
      <Text className="disclaimer" color="#777777" size="xs">
        A $50 refundable deposit is required and will be chargeed to your credit card on file.
        In the event that all rental is not returned, you will be charged for the missing items.
      </Text>
      <div className="floating-submit-button" style={{ bottom: "3%" }}>
        <Button style={{ marginTop: 20 }} onClick={gotoCheckout}>Go to checkout</Button>
      </div>
      <div style={{ height: "15vh" }}></div>
    </div>

  )
}
