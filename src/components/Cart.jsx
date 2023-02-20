import React, { useState } from 'react';
import { Button, Text, Group, Modal, Table, Drawer, useMantineTheme, Title, Checkbox, Radio } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';

export default function Cart({ restaurant, cartData, updateOrders, cartOpened, setCartOpened }) {
  const theme = useMantineTheme();
  const [wantReturnableItems, setWantReturnableItems] = useState("No")

  const restaurantDetailsHelper = (order, restaurant) => {
    let menuSections = restaurant.menu_sections;
    let item;
    try {
      for (let menuSectionIndex = 0; menuSectionIndex < menuSections.length; menuSectionIndex++) {
        let menuSectionItems = menuSections[menuSectionIndex].items
        console.log(menuSectionItems, "---- ")
        for (let itemIndex = 0; itemIndex < menuSectionItems.length; itemIndex++) {
          if (menuSectionItems[itemIndex].id == order.item) {
            item = menuSectionItems[itemIndex]
            break
          }
        }
        // break
      }
    } catch (e) {
      console.log(e)
    }
    return item
  }


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

  const submitOrder = () => {     //  /////////////////////////////////////////////////////////////// also, the id nested within the item of the order is different than the name of the order
    // let orders = Object.keys(cart).filter((key, index) => cart[key].quantity > 0).map((key, index) => ({ id: uuid(), item: key, quantity: cart[key] }));

    // let ordersObject = {}
    // orders.forEach(order => ordersObject[order.id] = order)

    // // if there are any orders to submit, we should submit; otherwise do nothing
    // if (orders.length > 0) {
    //   let formData = { ...form.values, datetime: moment().format(), id: transactionID, orders: ordersObject }
    //   updateTransactions(formData)
    //   setCartData({})
    // }

  }
  return (

    <Drawer
      opened={cartOpened}
      onClose={() => setCartOpened(false)}
      title="Your cart"
      position="bottom"
      size="93%"
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      padding="lg"

    >

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
          <tbody>{rows}</tbody>
        </Table>
      </div>

      <Radio.Group
        name="favoriteFramework"
        label="Would you like to rent some returnable utensils?"
        // description="This is anonymous"
        value={wantReturnableItems}
        onChange={setWantReturnableItems}
        orientation='vertical'
      >
        <Radio value="Yes" label="Yes" />
        <Radio value="No" label="No" />
      </Radio.Group>

      <div style={{ textAlign: "center", paddingTop: 20 }}>
        <Title size="medium">Card on file</Title>
        <Cards
          number={"1234123412341234"}
          expiry={"04/19"}
          cvc={"000"}
          name={"Your Name"}
          focused={"number"}
          previe={true}
          issuer={"Visa"}
        />
        <Link
          to={`/browse`} //placeholder
          style={{ textDecoration: "none" }}
        >
          <Button className="submit-button" style={{ marginTop: 20 }} onClick={submitOrder}>Go to checkout</Button>
        </Link>
      </div>

    </Drawer>
  )
}
