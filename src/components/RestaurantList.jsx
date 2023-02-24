import { useEffect, useState } from 'react';
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
import { Button, Text, Title } from '@mantine/core';
import FilterSelector from './FilterSelector';
import Onboard from './Onboard';
import { useFilterStore } from '../store/filterStore';
import { typeOfDrawer } from './FilterDrawer';


const RestaurantList = ({ restaurants }) => {
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
    // const [currTagFilter, setCurrTagFilter] = useState("");
    const [currTagFilters, setCurrTagFilters] = useState([]);
    const [tempFilters, setTempFilters] = useState(currTagFilters);
    let {filters, setFilters} = useFilterStore(); // using zustand store
    const [filterOpen, setFilterOpen] = useState(false);

    const [desiredDate, setDesiredDate] = useState("");
    const [desiredTime, setDesiredTime] = useState("");
    const [size, setSize] = useState(0);
    const [address, setAddress] = useState("");

    const [filteredByTime, setFilteredByTime] = useState([]); // restaurants filtered by time
    const [filteredBySize, setFilteredBySize] = useState([]);
    // TODO: Filtered by other tags


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
        setCurrTagFilters(filters);
    }

    const removeFilterTag = (tag) => {
        let tagFilters = currTagFilters.filter(f => f !== tag);
        setTempFilters(tagFilters);
        setTagFilter(tagFilters);
    };

    const setTimeFilter = (date) => {

        let restaurantList = filters.includes('size')? filteredBySize: restaurants

        let desiredDate
        let tempList = restaurantList.filter(restaurant => {
            desiredDate = new Date(date)
            //Remove advance notice time from inputted to see if it is far enough in the future
            desiredDate.setHours(desiredDate.getHours() - restaurant.profile.advance_notice)
            //If the date is still in the future (there is enough time to fulfill order)
            return (desiredDate > new Date())
        })
        setFilteredByTime(tempList);
        setFilteredRestaurants(tempList)
    }

    const setOrderSize = (inputSize) => {
        let restaurantList = filters.includes('time')? filteredByTime : restaurants
        setSize(inputSize)
        if(inputSize){
        let tempList = restaurantList.filter(restaurant =>
            restaurant.profile.upper_order_bound >= inputSize && inputSize >= restaurant.profile.lower_order_bound)
        setFilteredRestaurants(tempList)
        setFilteredBySize(tempList);
        }
    }

    const openFilterDrawer = () => {
        setFilterOpen(true);
    };


    useEffect(()=> {
        if(!filters.includes('time') && !filters.includes('size')){
            setFilteredRestaurants(restaurants); // reset
        } else if(!filters.includes('time')){
            setFilteredRestaurants(filteredBySize);
        } else if(!filters.includes('size')){
            setFilteredRestaurants(filteredByTime);
        }
    }, [filters])
    

    return (
        <div>
            <Header />
            <Onboard setDesiredDate={setDesiredDate} setSize={setSize} size={size} setAddress={setAddress} address={address} setDesiredTime={setDesiredTime} desiredDate={desiredDate} desiredTime={desiredTime}/>

            <Button className="filter-button" onClick={openFilterDrawer}>
                <FaFilter></FaFilter>
                <div className="filter-name">Filter</div>
            </Button>
            <FilterSelector setFilterOpen={setFilterOpen} filterOpen={filterOpen} tags={tags} setTagFilter={setTagFilter} tempFilters={tempFilters} setTempFilters={setTempFilters} />

            <div className='tags'>
                <SizeFilter setOrderSize={setOrderSize} size={size} numberOfRestaurantsFound={filteredRestaurants.length}/>

                <TimeFilter setTimeFilter={setTimeFilter} numberOfRestaurantsFound={filteredRestaurants.length}/>

                {tags.filter(tag => currTagFilters.includes(tag)).map(tag => <FilterItem key={tag} tag={tag} removeFilterTag={removeFilterTag} />)}
            </div>

            <div className='restaurant-list'>
                {filteredRestaurants.length > 0? 

                 filteredRestaurants.map(r => <Restaurant key={r.id} restaurant={r} />):
                 <div style={{marginTop: 100}}>
                 <Title align='center'>No data</Title>
                 <Text align='center'>For the chosen filters</Text>
                 </div>
                
                }
            </div>

            <Navbar />
        </div>
    );

}

export default RestaurantList;