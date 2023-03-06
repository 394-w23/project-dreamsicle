import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import logo from '../logo.svg';
import './Restaurant.css';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useDbData, useDbUpdate } from '../utils/firebase';


const Restaurant = ({ restaurant }) => {
  let navigate = useNavigate();

  // when you click on another restaurant, clear cart

  let userId = 0 //////////////////////////////////////////////////////////////////// Hard Coded, change later !!!!!!!!
  const [updateCart, cartResult] = useDbUpdate(`/users/${userId}/cart/`);
  const [data, error] = useDbData('/');
  const [cartData, setCartData] = useState();
  const [restaurantInCart, setRestaurantInCart] = useState();

  useEffect(() => {
    if (data) {
      let restaurantInCart = data.users[userId].cart.restaurant;
      setRestaurantInCart(restaurantInCart);
    }
  }, [data])


  const clearCart = () => {
    // if we click on a card, and the rest. in the current cart does not match, then clear the cart
    if (restaurant.id !== Number(restaurantInCart)) {
      // then clear cart
      const newRestaurantCart = {
        restaurant: restaurant.id,
        orders: {}
      }
      updateCart(newRestaurantCart);
      console.log(" clearing cart")
    }
  }





  return (
    <div className='restaurant'>
      <Link onClick={clearCart} to={`/browse/${restaurant.id}`} style={{ textDecoration: 'none' }}
      >

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={restaurant.profile.photo}
              height={160}

              alt="Restaurant image"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{restaurant.profile.name}</Text>
            <Text weight={500}>$$</Text>
          </Group>
          <Group position="apart" mt="md" mb="xs">
            <Text>Advance notice: {restaurant.profile.advance_notice} hours</Text>
            <Text>{restaurant.profile.lower_order_bound}-{restaurant.profile.upper_order_bound} people</Text>
          </Group>
        </Card>


        {/*                
                <div className="">
                    <img className='photo' src={`${restaurant.profile.photo}`}></img>
                </div>
                <div className="details">


                    <div className='name'>{restaurant.profile.name}</div>
                 
                    <div className='notice'>Notice Time: 24 hrs</div>
                    <div className='person-range'>{restaurant.profile.lower_order_bound}-{restaurant.profile.upper_order_bound}</div>
                    <div onClick={onClick}>Click Me</div>

                </div> */}


      </Link>
    </div>);
}

export default Restaurant;