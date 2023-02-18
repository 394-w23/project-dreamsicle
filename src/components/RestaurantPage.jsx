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

const RestaurantPage = ({ restaurants, cart }) => {
  let userId = 0 //////////////////////////////////////////////////////////////////// Hard Coded, change later !!!!!!!!
  
  const [updateOrders, orderResult] = useDbUpdate(`/users/${userId}/cart/orders`);
  const [updateCart, cartResult] = useDbUpdate(`/users/${userId}/cart/`);

  const [itemDetailsOpened, setItemDetailsOpened] = useState(false);
  const [itemDetails, setItemDetails] = useState({});

  const [cartOpened, setCartOpened] = useState(false);
  const [cartData,setCartData] = useState(cart);
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
      const newRestaurantCart={
        restaurant: restaurantID,
        orders: {}
      }
      updateCart(newRestaurantCart)
      setCartData(newRestaurantCart);
    }
  }, [])

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
      <Cart restaurant={restaurant} cartData={cartData} updateOrders={updateOrders} cartOpened={cartOpened} setCartOpened={setCartOpened}/>

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
      <div className="open-cart">
          <Button leftIcon={<FaShoppingCart size="20" />} className="submit-button" onClick={openCart}>Check Out Order</Button>
      </div>
    </div>
  );
};

export default RestaurantPage;
