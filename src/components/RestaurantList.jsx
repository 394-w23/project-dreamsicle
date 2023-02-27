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
import { Button, NumberInput, Text, Title } from '@mantine/core';
import FilterSelector from './FilterSelector';
import Onboard from './Onboard';
import { useFilterStore } from '../store/filterStore';
import { typeOfDrawer } from './FilterDrawer';
import DateTimePicker from 'react-datetime-picker';
import { DatePicker, TimeInput } from '@mantine/dates';


const RestaurantList = ({ restaurants }) => {
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
    // const [currTagFilter, setCurrTagFilter] = useState("");
    const [currTagFilters, setCurrTagFilters] = useState([]);
    const [tempFilters, setTempFilters] = useState(currTagFilters);
    let { filters, setFilters } = useFilterStore(); /////////////////// using zustand store
    const [filterOpen, setFilterOpen] = useState(false);

    const [desiredDate, setDesiredDate] = useState("");
    const [desiredTime, setDesiredTime] = useState("");
    const [filterDate, setFilterDate] = useState(null);
    const [size, setSize] = useState(0);
    const [address, setAddress] = useState("");

    // const [filteredByTime, setFilteredByTime] = useState([]); // restaurants filtered by time
    // const [filteredBySize, setFilteredBySize] = useState([]);
    // TODO: Filtered by other tags


    const removeFilterTag = (tag) => {
        let tagFilters = currTagFilters.filter(f => f !== tag);
        setTempFilters(tagFilters);
        setCurrTagFilters(tagFilters);
    };

    const openFilterDrawer = () => {
        setFilterOpen(true);
    };

    const applyFilters = () => {
        let filteredList = restaurants;

        filteredList = restaurants.filter(restaurant => {
            for (let filter of currTagFilters) {
                console.log(restaurant)
                if (restaurant.profile.tags && !restaurant.profile.tags || !restaurant.profile.tags.includes(filter)) {
                    return false;
                }
            }
            return true;
        });

        if (filters.includes('time') && filterDate) {
            filteredList = filteredList.filter(restaurant => {
                let desiredDate = new Date();
                desiredDate.setHours(desiredDate.getHours() + filterDate)
                //Remove advance notice time from inputted to see if it is far enough in the future
                desiredDate.setHours(desiredDate.getHours() - restaurant.profile.advance_notice)
                //If the date is still in the future (there is enough time to fulfill order)
                return (desiredDate >= new Date())
            });
        }

        if (filters.includes('time') && size) {
            filteredList = filteredList.filter(restaurant =>
                (restaurant.profile.upper_order_bound >= size) && (size >= restaurant.profile.lower_order_bound));
        }

        setFilteredRestaurants(filteredList);
    };

    useEffect(() => {
        applyFilters();
    }, [filters, size, filterDate, currTagFilters])


    return (
        <div>
            <Header />

            <Onboard setDesiredDate={setDesiredDate} setSize={setSize} size={size} setAddress={setAddress} address={address} setDesiredTime={setDesiredTime} desiredDate={desiredDate} desiredTime={desiredTime} />

            <div className="main-filters">
                <NumberInput
                    className="size-input"
                    defaultValue={null}////////////////////////// Change to size or empty
                    placeholder="Size"
                    label="Party Size"
                    styles={{ input: { textAlign: 'center' } }}
                    hideControls
                />
                <DatePicker
                    className="date-input"
                    label="Delivery Date"
                    placeholder="Select Delivery Date"
                    firstDayOfWeek="sunday"
                />
                <TimeInput
                    className="time-input"
                    label="Delivery Time"
                    format="12"
                />
                {/* <DateTimePicker 
                    className="datetime-input"
                    name="Delivery Time"
                /> */}
            </div>

            <Button className="filter-button" onClick={openFilterDrawer}>
                <FaFilter></FaFilter>
                <div className="filter-name">Filter</div>
            </Button>
            <FilterSelector setFilterOpen={setFilterOpen} filterOpen={filterOpen} tags={tags} setCurrTagFilters={setCurrTagFilters} tempFilters={tempFilters} setTempFilters={setTempFilters} />

            <div className='tags'>
                <SizeFilter setSize={setSize} size={size} numberOfRestaurantsFound={filteredRestaurants.length} />

                <TimeFilter numberOfRestaurantsFound={filteredRestaurants.length} filterDate={filterDate} setFilterDate={setFilterDate} />

                {tags.filter(tag => currTagFilters.includes(tag)).map(tag => <FilterItem key={tag} tag={tag} removeFilterTag={removeFilterTag} />)}
            </div>

            <div className='restaurant-list'>
                {filteredRestaurants.length > 0 ?

                    filteredRestaurants.map(r => <Restaurant key={r.id} restaurant={r} />) :
                    <div style={{ marginTop: 100 }}>
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