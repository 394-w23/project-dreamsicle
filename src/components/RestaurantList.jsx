import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Restaurant from './Restaurant';
import logo from '../logo.svg';

const RestaurantList = ({ restaurants,setRestaurantID, setRestaurant }) => {
    const { id } = useParams();

    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {restaurants.map(r => <Restaurant restaurant={r} setRestaurant={setRestaurant} setRestaurantID={setRestaurantID}/>)}


        </div>);
}

export default RestaurantList;