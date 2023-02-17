import { useState } from 'react'
import { Link } from "react-router-dom";
import MenuSection from "./MenuSection.jsx";
import { Button, Text, Group, Modal, Table } from "@mantine/core";
import uuid from 'react-uuid';
import { useDbData, useDbUpdate } from '../utils/firebase';
import { useForm } from '@mantine/form';
import moment from 'moment';
import { useParams } from "react-router-dom";
import Header from './Header';
import BackButton from "./BackButton.jsx";
import { FaShoppingCart } from "@react-icons/all-files/Fa/FaShoppingCart"

const RestaurantPage = ({ restaurants, cart, setCart }) => {
  const [cartOpened, setCartOpened] = useState(false);

  const restaurantID = useParams().restaurant_id
  const restaurant = restaurants.filter(r => r.id.toString() === restaurantID)[0]
  console.log(restaurantID)
  console.log(restaurants)
  console.log(restaurant)
  const transactionID = uuid();
  const [updateTransactions, result] = useDbUpdate(`/transactions/${transactionID}`);

  let form = useForm({
    initialValues: {
      id: transactionID,
      datetime: '',
      restaurant: restaurant.id,
      user: 0, ////////////////////////////////////////////////////////////////// HARD CODED USER
      orders: {}
    },
  });

  const submitOrder = () => {     // console.log("anything") /////////////////////////////////////////////////////////////// also, the id nested within the item of the order is different than the name of the order
    // console.log(moment().format())
    let orders = Object.keys(cart).filter((key, index) => cart[key].quantity > 0).map((key, index) => ({ id: uuid(), item: key, quantity: cart[key] }));
    // console.log(orders)

    let ordersObject = {}
    orders.forEach(order => ordersObject[order.id] = order)
    // console.log(ordersObject)

    // if there are any orders to submit, we should submit; otherwise do nothing
    if (orders.length > 0) {
      let formData = { ...form.values, datetime: moment().format(), id: transactionID, orders: ordersObject }
      updateTransactions(formData)
      setCart({})
    }

  }

  let openCart = () => {
    setCartOpened(true);
  };

  /////////////////////////////// NEED A WAY TO CLEAR CART FOR WHEN YOU GO BACK AND RE-ENTER
  // let clearCart = () => {
  //   setCart({});
  //   cartOrders = []
  // };

  const menu = []
  //flattens the menu_sections for a given restaurant
  Object.values(restaurants[restaurantID].menu_sections).forEach(section =>
    section.items.forEach(item => menu.push(item)));

  let cartOrders = []
  //create a list of all the items in our order
  Object.values(cart).forEach(i => {
    cartOrders = Object.keys(cart).filter((key, index) => cart[key] > 0).map((key, index) => ({ item: (menu.filter(menu_item => menu_item.id.toString() === key)[0]), quantity: cart[key] }));
  });

  let total_price = 0
  Object.values(cartOrders).forEach(i => {
    console.log(i)
    console.log(cart[i.item.id])
    console.log(i.price)
    total_price += cart[i.item.id] * i.item.price;
  });

  let rows = cartOrders.map((itemObj) => (
    <tr key={itemObj.item.id}>
      <td>{itemObj.item.name}</td>
      <td>{itemObj.quantity}</td>
      <td>${itemObj.item.price * itemObj.quantity}</td>
    </tr>
  ));

  rows.push(<tr key={0}>
    <td><span style={{ fontWeight: 'bold' }}>Total</span></td>
    <td></td>
    <td><span style={{ fontWeight: 'bold' }}>${total_price}</span></td>
  </tr>)


  return (
    <div className="restaurant-page">
      <Header />

      <Modal
        opened={cartOpened}
        onClose={() => setCartOpened(false)}
        title="Introduce yourself!"
      >
        <div className="table">
          <Table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quanity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </Modal>

      <Group position="apart" mt="md" mb="xs">
        <BackButton />
        <Button onClick={openCart}>
          <FaShoppingCart size="20" />
        </Button>

        <Text className="restaurant-address">{restaurant.profile.contact_info.address.street}, {restaurant.profile.contact_info.address.city}</Text>
      </Group>

      <div className="restaurant-description">
        <img className="restaurant-logo" src={restaurant.profile.photo} style={{ width: '20em' }} ></img>
        <div>{restaurant.profile.description}</div>
      </div>

      <div>
        {Object.values(restaurant.menu_sections).map((s) => (
          <MenuSection key={s.id} menu_section={s} cart={cart} setCart={setCart} />
        ))}
      </div>
      <div className="submit">
        <Link
          to={`/${restaurant.id}/${transactionID}`}
          style={{ textDecoration: "none" }}
        >
          <Button className="submit-button" onClick={submitOrder}>Check Out Order</Button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantPage;
