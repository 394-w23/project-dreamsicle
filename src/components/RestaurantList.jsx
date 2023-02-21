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
import TimeFilter from './TimeFilter';
import SizeFilter from './SizeFilter';


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
    const setTimeFilter = (date) => {
        let dt = new Date()
        let desiredDate

        let tempList = restaurants.filter(restaurant => {
            dt = new Date()
            desiredDate = new Date(date)
            //Remove advance notice time from inputted to see if it is far enough in the future
            desiredDate.setHours(desiredDate.getHours() - restaurant.profile.advance_notice)
            //If the date is still in the future (there is enough time to fulfill order)
            console.log("Min Restaurant Time", restaurant.profile.advance_notice)
            console.log("Order would need to be placed by", desiredDate)
            console.log(desiredDate > dt)
            return (desiredDate > dt)
        })
        setFilteredRestaurants(tempList)
    }
    const setOrderSize = (size) => {
        let tempList = restaurants.filter(restaurant => restaurant.profile.upper_order_bound >= size && size >= restaurant.profile.lower_order_bound)
        setFilteredRestaurants(tempList)
    }

    return (
        <div>
            <Header />
            <div className='tags'><SizeFilter setOrderSize={setOrderSize} /><TimeFilter setTimeFilter={setTimeFilter} />{tags.map(tag => <FilterItem key={tag} tag={tag} setFilter={setFilter} />)}</div>
            <div className='restaurant-list'>
                {filteredRestaurants.map(r => <Restaurant key={r.id} restaurant={r} />)}
            </div>

            {/* <Navbar /> */}
        </div>
    );

}

export default RestaurantList;