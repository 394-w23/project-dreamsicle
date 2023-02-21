import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Restaurant from './Restaurant';
import logo from '../logo.svg';
import './RestaurantList.css';
import Header from './Header';
import "./RestaurantPage.css";
import Navbar from './Navbar';



const RestaurantList = ({ restaurants}) => {
    const { id } = useParams();

    return (
        <div>
            <Header />
            
            <div className='restaurant-list'>
                {restaurants.map(r => <Restaurant key={r.id} restaurant={r} />)}
            </div>

            {/* <Navbar /> */}
        </div>
    );

}

export default RestaurantList;