import { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import MenuSection from "./MenuSection.jsx";
import { Button, Text, Group, Modal, Table, Alert } from "@mantine/core";
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
import RestaurantDrawer from './RestaurantDrawer.jsx';
import Checkout from './Checkout.jsx';
import { BiErrorCircle } from "@react-icons/all-files/Bi/BiErrorCircle"
import Navbar from "./Navbar";

const RestaurantPage = ({ restaurants, cart }) => {
  let userId = 0 //////////////////////////////////////////////////////////////////// Hard Coded, change later !!!!!!!!

  const [updateOrders, orderResult] = useDbUpdate(`/users/${userId}/cart/orders`);
  const [updateCart, cartResult] = useDbUpdate(`/users/${userId}/cart/`);

  const [itemDetailsOpened, setItemDetailsOpened] = useState(false);
  const [raiseAlert, setRaiseAlert] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const [drawerState, setDrawerState] = useState("");

  const [cartOpened, setCartOpened] = useState(false);
  const [cartData, setCartData] = useState(cart);

  const errorsRef = useRef(null)
  // const [cartData, cartError] = useDbData(`/users/${userId}/cart/`);
  // console.log("cart",cart)
  // console.log("cartData",cartData)
  const restaurantID = useParams().restaurant_id
  const restaurant = restaurants.filter(r => r.id.toString() === restaurantID)[0]

  const transactionID = uuid();
  const [updateTransactions, result] = useDbUpdate(`/transactions/${transactionID}`);

  useEffect(() => {

    if (!cartData || (restaurantID !== cartData.restaurant)) {
      console.log("resetting cart")
      const newRestaurantCart = {
        restaurant: restaurantID,
        orders: {}
      }
      updateCart(newRestaurantCart)
      setCartData(newRestaurantCart);
    }
  }, [cartData])



  let openCart = () => {
    // console.log("cartData.orders",cartData.orders)
    // console.log("Object.values(cartData.orders)",Object.values(cartData.orders))
    if (cartData.orders && Object.values(cartData.orders).length > 0) {
      setRaiseAlert(false)
      setDrawerState("cart");
    } else {
      setRaiseAlert(true);
      errorsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menu = []
  //flattens the menu_sections for a given restaurant
  Object.values(restaurants[restaurantID].menu_sections).forEach(section =>
    section.items.forEach(item => menu.push(item)));

  return (
    <div className="restaurant-page">
      <Header />

      <RestaurantDrawer setDrawerState={setDrawerState} drawerState={drawerState}>

        {
          drawerState === "checkout" ? <Checkout restaurant={restaurant} setCartData={setCartData} cartData={cartData} updateCart={updateCart} setDrawerState={setDrawerState} />
            : <Cart restaurant={restaurant} updateOrders={updateOrders} setCartData={setCartData} cartData={cartData} setDrawerState={setDrawerState} />
        }

      </RestaurantDrawer>

      <ItemDetails updateOrders={updateOrders} itemDetails={itemDetails} itemDetailsOpened={itemDetailsOpened} setItemDetailsOpened={setItemDetailsOpened} cartData={cartData} setCartData={setCartData} setItemDetails={setItemDetails} />

      <Group position="apart" mt="md" mb="xs">
        <BackButton />
        <Text className="restaurant-address">{restaurant.profile.contact_info.address.street}, {restaurant.profile.contact_info.address.city}</Text>
      </Group>

      <div className="restaurant-description">
        <img className="restaurant-logo" src={restaurant.profile.photo} style={{ width: '20em' }} ></img>
        <div>{restaurant.profile.description}</div>
      </div>

      <div>
        {Object.values(restaurant.menu_sections).map((s) => (
          <MenuSection key={s.id} setItemDetails={setItemDetails} setItemDetailsOpened={setItemDetailsOpened} menu_section={s} cartData={cartData} setCartData={setCartData} />
        ))}
      </div>

      {raiseAlert && <div style={{ textAlign: "center", marginTop: 20, marginBottom: 10, }} >
        <Alert icon={
          <BiErrorCircle size={16} />} title="Minimum Order" color="red">
          You must add at least one item to cart!
        </Alert>
      </div>}


      <div className="floating-submit-button">
        <Button leftIcon={<FaShoppingCart size="20" />} onClick={openCart}>View Cart</Button>
      </div>
      <div style={{height:"8vh"}} ref={errorsRef}></div>
      <Navbar />
    </div>
  );
};

export default RestaurantPage;
