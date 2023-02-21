import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Restaurant from './Restaurant';
import logo from '../logo.svg';
import './RestaurantList.css';
import Header from './Header';
import "./RestaurantPage.css";
import Navbar from './Navbar';
import { tags } from '../utils/helper';
import FilterItem from './FilterItem';


const RestaurantList = ({ restaurants }) => {
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
    const [currFilter, setcurrFilter] = useState("")
    const setFilter = (filter) => {
        let tempList = restaurants.filter(restaurant => restaurant.profile.tags.includes(filter))
        if (filter === currFilter) {
            setcurrFilter("")
            setFilteredRestaurants(restaurants)
        } else {
            setcurrFilter(filter)
            setFilteredRestaurants(tempList)
        }
    }

    return (
        <div>
            <Header />
            <div className='tags'>{tags.map(tag => <FilterItem key={tag} tag={tag} setFilter={setFilter} />)}</div>
            <div className='restaurant-list'>
                {filteredRestaurants.map(r => <Restaurant key={r.id} restaurant={r} />)}
            </div>

            {/* <Navbar /> */}
        </div>
    );

}

export default RestaurantList;