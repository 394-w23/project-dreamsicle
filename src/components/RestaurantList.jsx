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
import { FaFilter } from "@react-icons/all-files/Fa/FaFilter"
import { Button } from '@mantine/core';
import FilterSelector from './FilterSelector';


const RestaurantList = ({ restaurants }) => {
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
    const [currTagFilter, setCurrTagFilter] = useState("");
    const [currTagFilters, setCurrTagFilters] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);

    const setTagFilter = (filters) => {
        // let tempList = restaurants.filter(restaurant => restaurant.profile.tags.includes(filter))
        // if (filter === currTagFilter) {
        //     setCurrTagFilter("")
        //     setFilteredRestaurants(restaurants)
        // } else {
        //     setCurrTagFilter(filter)
        //     setFilteredRestaurants(tempList)
        // }
        let filteredList = restaurants.filter(restaurant => {
            for (let filter of filters) {
                if (!restaurant.profile.tags.includes(filter)) {
                    return false;
                }
            }
            return true;
        });
        setFilteredRestaurants(filteredList);
    }

    const setTimeFilter = (date) => {
        let desiredDate

        let tempList = restaurants.filter(restaurant => {
            desiredDate = new Date(date)
            //Remove advance notice time from inputted to see if it is far enough in the future
            desiredDate.setHours(desiredDate.getHours() - restaurant.profile.advance_notice)
            //If the date is still in the future (there is enough time to fulfill order)
            return (desiredDate > new Date())
        })
        setFilteredRestaurants(tempList)
    }

    const setOrderSize = (size) => {
        let tempList = restaurants.filter(restaurant =>
            restaurant.profile.upper_order_bound >= size && size >= restaurant.profile.lower_order_bound)
        setFilteredRestaurants(tempList)
    }

    const openFilterDrawer = () => {
        setFilterOpen(true);
    };

    return (
        <div>
            <Header />

            <Button className="filter-button" onClick={openFilterDrawer}>
                <FaFilter></FaFilter>
                <div className="filter-name">Filter</div>
            </Button>
            <FilterSelector setFilterOpen={setFilterOpen} filterOpen={filterOpen} tags={tags} setTagFilter={setTagFilter} />

            <div className='tags'>
                <SizeFilter setOrderSize={setOrderSize} />
                <TimeFilter setTimeFilter={setTimeFilter} />
                {tags.map(tag => <FilterItem key={tag} tag={tag} setTagFilter={setTagFilter} />)}
            </div>

            <div className='restaurant-list'>
                {filteredRestaurants.map(r => <Restaurant key={r.id} restaurant={r} />)}
            </div>

            {/* <Navbar /> */}
        </div>
    );

}

export default RestaurantList;