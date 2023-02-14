import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Restaurant from './Restaurant';
import logo from '../logo.svg';
import './RestaurantList.css';
 

const RestaurantList = ({ restaurants, setRestaurantID, setRestaurant }) => {
    const { id } = useParams();

    return (
        <div className='restaurant-list'>
            {restaurants.map(r => <Restaurant key={r.id} restaurant={r} setRestaurant={setRestaurant} setRestaurantID={setRestaurantID}/>)}


        </div>);
}

export default RestaurantList;