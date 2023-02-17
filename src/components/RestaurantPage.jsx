import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import MenuSection from "./MenuSection.jsx";
import { Button, Text, Group, Modal, Table, Drawer } from "@mantine/core";
import uuid from 'react-uuid';
import { useDbData, useDbUpdate } from '../utils/firebase';
import { useForm } from '@mantine/form';
import moment from 'moment';
import { useParams } from "react-router-dom";
import Header from './Header';
import BackButton from "./BackButton.jsx";
import { FaShoppingCart } from "@react-icons/all-files/Fa/FaShoppingCart"
import Cart from './Cart.jsx';
import ItemDetails from './ItemDetails.jsx';

const RestaurantPage = ({ restaurants, cart, setCart }) => {
  let userId = 0 //////////////////////////////////////////////////////////////////// Hard Coded, change later !!!!!!!!
  const [cartOpened, setCartOpened] = useState(false);
  const [updateOrders, orderResult] = useDbUpdate(`/users/${userId}/cart/orders`);
  const [updateCart, cartResult] = useDbUpdate(`/users/${userId}/cart/`);
  const [itemDetails, setItemDetails] = useState({});
  const [itemDetailsOpened, setItemDetailsOpened] = useState(false);
  const [cartData, cartError] = useDbData(`/users/${userId}/cart/`);

  const restaurantID = useParams().restaurant_id
  const restaurant = restaurants.filter(r => r.id.toString() === restaurantID)[0]
  console.log(restaurantID)
  console.log(restaurants)
  console.log(restaurant)
  const transactionID = uuid();
  const [updateTransactions, result] = useDbUpdate(`/transactions/${transactionID}`);

  useEffect(() => {
    if (!cartData || (restaurantID !== cartData.restaurant)) {
      updateCart({
          restaurant: restaurantID,
          orders: {}
        })
        // setCart(cartData);
    }
  }, [])

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

  const menu = []
  //flattens the menu_sections for a given restaurant
  Object.values(restaurants[restaurantID].menu_sections).forEach(section =>
    section.items.forEach(item => menu.push(item)));

  return (
    <div className="restaurant-page">
      <Header />
      <Cart updateOrders={updateOrders} cartOpened={cartOpened} setCartOpened={setCartOpened}/>

      <ItemDetails updateOrders={updateOrders} itemDetails={itemDetails} itemDetailsOpened={itemDetailsOpened} setItemDetailsOpened={setItemDetailsOpened} cart={cart} setCart={setCart} setItemDetails={setItemDetails} />

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
          <MenuSection key={s.id} setItemDetails={setItemDetails} setItemDetailsOpened={setItemDetailsOpened} menu_section={s} cart={cart} setCart={setCart} />
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
