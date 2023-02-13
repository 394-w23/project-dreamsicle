import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import logo from '../logo.svg';
import './Restaurant.css';

const Restaurant = ({ restaurant, setRestaurantID, setRestaurant }) => {
    const { id } = useParams();
    const onClick = () => {
        setRestaurant(restaurant);
        setRestaurantID(restaurant.id)
    }

    return (
        <div className='restaurant'>
            <Link to={`/${restaurant.id}`}>
                <img className='photo' src={`${restaurant.profile.photo}`}></img>
                <div className='name'>{restaurant.profile.name}</div>
                {/* <div>{restaurant.profile.description}</div> */}
                <div className='notice'>Notice Time: 24 hrs</div>
                <div className='person-range'>{restaurant.profile.lower_order_bound}-{restaurant.profile.upper_order_bound}</div>
                <div onClick={onClick}>Click Me</div>
            </Link>
        </div>);
}

export default Restaurant;