import { Link } from "react-router-dom";
import MenuSection from "./MenuSection.jsx";
import { Button } from "@mantine/core";
import uuid from 'react-uuid';
import { useDbData, useDbUpdate } from '../utils/firebase';
import { useForm } from '@mantine/form';
import moment from 'moment';

const RestaurantPage = ({ restaurant, cart, setCart }) => {
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

  const submitOrder = () => { //////////////////////////////////////////////////////////// CURRENTLY, ITEM IS TECHNICALLY section-item. Remember to fix this
    // console.log("anything") /////////////////////////////////////////////////////////////// also, the id nested within the item of the order is different than the name of the order
    // console.log(moment().format())
    let orders = Object.keys(cart).filter((key, index) => cart[key] > 0).map((key, index) => ({ id: uuid(), item: key, quantity: cart[key]}));
    // console.log(orders)

    let ordersObject = {}
    orders.forEach(order => ordersObject[order.id] = order)
    console.log(ordersObject)

    // if there are any orders to submit, we should submit; otherwise do nothing
    if (orders.length > 0) {
      let formData = { ...form.values, datetime: moment().format(), id: transactionID, orders: ordersObject}
      console.log("before", formData)
      console.log("after", formData)
      updateTransactions(formData)
      setCart({})
    }
    
  }

  return (
    <div>
      <img src={restaurant.profile.photo}></img>
      <div>{restaurant.profile.description}</div>
      <div>
        {Object.values(restaurant.menu_sections).map((s) => (
          <MenuSection menu_section={s} cart={cart} setCart={setCart} />
        ))}
      </div>
      <Link
        to={`/${restaurant.id}/${transactionID}`}
        style={{ textDecoration: "none" }}
      >
        <Button onClick={submitOrder}>Check out order</Button>
      </Link>
    </div>
  );
};

export default RestaurantPage;
