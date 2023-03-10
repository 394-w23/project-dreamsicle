import { useEffect, useRef, useState } from 'react'
import MenuSection from "../Menu/MenuSection.jsx";
import { Card, Image, Button, Text, Group, Title, Alert } from "@mantine/core";
import uuid from 'react-uuid';
import { useDbUpdate } from '../../utils/firebase';
import { useParams } from "react-router-dom";
import Header from '../Navigation/Header.jsx';
import BackButton from '../Navigation/BackButton.jsx';
import { FaShoppingCart } from "@react-icons/all-files/Fa/FaShoppingCart"
import RestaurantDrawer from './RestaurantDrawer.jsx';
import { BiErrorCircle } from "@react-icons/all-files/Bi/BiErrorCircle"
import Navbar from '../Navigation/Navbar.jsx';
import Cart from '../Cart/Cart.jsx';
import ItemDetails from '../Menu/ItemDetails.jsx';
import Checkout from '../Cart/Checkout.jsx';

const RestaurantPage = ({ restaurants, cart }) => {
  let userId = 0 //////////////////////////////////////////////////////////////////// Hard Coded, change later !!!!!!!!

  const [updateUtensils, orderUtensilsResult] = useDbUpdate(`/users/${userId}/cart/utensils`);
  const [updateOrders, orderResult] = useDbUpdate(`/users/${userId}/cart/orders`);
  const [updateCart, cartResult] = useDbUpdate(`/users/${userId}/cart/`);

  const [utensils, setItemDetailssetUtensils] = useState({});
  const [itemDetailsOpened, setItemDetailsOpened] = useState(false);
  const [raiseAlert, setRaiseAlert] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const [drawerState, setDrawerState] = useState("");

  const [cartOpened, setCartOpened] = useState(false);
  const [cartData, setCartData] = useState(cart);

  const topRef = useRef(null);
  useEffect(() => {
    topRef.current.scrollIntoView();
  }, []);

  const errorsRef = useRef(null);

  const restaurantID = useParams().restaurant_id
  const restaurant = restaurants.filter(r => r.id.toString() === restaurantID)[0]

  const transactionID = uuid();
  const [updateTransactions, result] = useDbUpdate(`/transactions/${transactionID}`);

  useEffect(() => {

    if (!cartData || (restaurantID !== cartData.restaurant)) {
      console.log("resetting cart")
      const newRestaurantCart = {
        restaurant: restaurantID,
        orders: {},
        utensils: {},
      }
      updateCart(newRestaurantCart)
      setCartData(newRestaurantCart);
    }
  }, [cartData])



  let openCart = () => {
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
    <div ref={topRef} className="restaurant-page">
      <Header />

      <RestaurantDrawer setDrawerState={setDrawerState} drawerState={drawerState}>

        {
          drawerState === "checkout" ? <Checkout restaurant={restaurant} setCartData={setCartData} cartData={cartData} updateCart={updateCart} setDrawerState={setDrawerState} />
            : <Cart restaurant={restaurant} updateCart={updateCart} updateOrders={updateOrders} setCartData={setCartData} cartData={cartData} setDrawerState={setDrawerState} />
        }

      </RestaurantDrawer>

      <ItemDetails updateOrders={updateOrders} itemDetails={itemDetails} itemDetailsOpened={itemDetailsOpened} setItemDetailsOpened={setItemDetailsOpened} cartData={cartData} setCartData={setCartData} setItemDetails={setItemDetails} />

      <Group position="apart" mt="md" mb="xs">
        <BackButton />
        <Text className="restaurant-address">{restaurant.profile.contact_info.address.street}, {restaurant.profile.contact_info.address.city}</Text>
      </Group>
      <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={restaurant.profile.photo}
              height={160}

              alt="Restaurant image"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Title>{restaurant.profile.name}</Title>
          </Group>

          <Text color="dimmed">{restaurant.profile.description}</Text>
        </Card>

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
      <div style={{ height: "8vh" }} ref={errorsRef}></div>
      <Navbar />
    </div>
  );
};

export default RestaurantPage;
