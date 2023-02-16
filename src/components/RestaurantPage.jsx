import { Link } from "react-router-dom";
import MenuSection from "./MenuSection.jsx";
import { Button, Text, Group } from "@mantine/core";
import uuid from 'react-uuid';
import { useDbData, useDbUpdate } from '../utils/firebase';
import { useForm } from '@mantine/form';
import moment from 'moment';
import { useParams } from "react-router-dom";
import Header from './Header';
import BackButton from "./BackButton.jsx";

const RestaurantPage = ({ restaurants, cart, setCart}) => {
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
    let orders = Object.keys(cart).filter((key, index) => cart[key] > 0).map((key, index) => ({ id: uuid(), item: key, quantity: cart[key] }));
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

  return (
    <div className="restaurant-page">
      <Header />
      <Group position="apart" mt="md" mb="xs">
        <BackButton/>
        <Text className="restaurant-address">{restaurant.profile.contact_info.address.street}, {restaurant.profile.contact_info.address.city}</Text>
      </Group>
      
      <div className="restaurant-description">
        <img src={restaurant.profile.photo} style={{width: '20em'}} ></img> 
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
