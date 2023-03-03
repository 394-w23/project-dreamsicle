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
import { Button, NumberInput, Text, Title, TextInput } from '@mantine/core';
import FilterSelector from './FilterSelector';
import Onboard from './Onboard';
import { useFilterStore } from '../store/filterStore';
import { typeOfDrawer } from './FilterDrawer';
import DateTimePicker from 'react-datetime-picker';
import { DatePicker, TimeInput } from '@mantine/dates';
import moment from 'moment';


const RestaurantList = ({ restaurants, onboardOpen, setOnboardOpen }) => {

    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
    // const [currTagFilter, setCurrTagFilter] = useState("");
    const [currTagFilters, setCurrTagFilters] = useState([]);
    const [tempFilters, setTempFilters] = useState(currTagFilters);
    let { filters, setFilters } = useFilterStore(); /////////////////// using zustand store
    const [filterOpen, setFilterOpen] = useState(false);


    const [desiredDate, setDesiredDate] = useState("");
    const [desiredTime, setDesiredTime] = useState("");
    const [formattedDesiredDateTime, setFormattedDesiredDateTime] = useState("");
    const [filterDate, setFilterDate] = useState(null);
    const [size, setSize] = useState(0);
    const [address, setAddress] = useState("");

    // const [filteredByTime, setFilteredByTime] = useState([]); // restaurants filtered by time
    // const [filteredBySize, setFilteredBySize] = useState([]);
    // TODO: Filtered by other tags

    // handle the event date and time
    function parseDesiredTime(desiredTime, desiredDate) {
        if (desiredTime && desiredDate) {
            let date = moment(desiredDate, "MM/DD/YYYY");
            let time = moment(desiredTime, "hh:mm a");
            let dateTime = date.add(time.hours(), 'hours').add(time.minutes(), 'minutes');
            console.log(dateTime.toDate().toISOString())
            if (dateTime.unix()) {
                setFormattedDesiredDateTime(dateTime);
            }
            if (!filters.includes(typeOfDrawer.TIME)) {
                setFilters([...filters, typeOfDrawer.TIME]);
            }
        } else if (desiredDate) {
            let date = moment(desiredDate, "MM/DD/YYYY");
            if (date.unix()) {
                setFormattedDesiredDateTime(date);
            }
            if (!filters.includes(typeOfDrawer.TIME)) {
                setFilters([...filters, typeOfDrawer.TIME]);
            }
        } else {
            let newFilters = filters.filter(x => x != typeOfDrawer.TIME);
            setFilters(newFilters);
        }
    }


    useEffect(() => {
        parseDesiredTime(desiredTime, desiredDate);
    }, [desiredTime, desiredDate]);

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

        // if (filters.includes('time') && filterDate) {
        //     filteredList = filteredList.filter(restaurant => {
        //         let desiredDate = new Date();
        //         desiredDate.setHours(desiredDate.getHours() + filterDate)
        //         //Remove advance notice time from inputted to see if it is far enough in the future
        //         desiredDate.setHours(desiredDate.getHours() - restaurant.profile.advance_notice)
        //         //If the date is still in the future (there is enough time to fulfill order)
        //         return (desiredDate >= new Date())
        //     });
        // }

        if (filters.includes('time') && formattedDesiredDateTime) {
            console.log('hi')
            console.log(new Date(formattedDesiredDateTime).toISOString())
            console.log(new Date(formattedDesiredDateTime).getHours())
            console.log(new Date(formattedDesiredDateTime).getMinutes())
            console.log(new Date(formattedDesiredDateTime).getDate())
            if (desiredTime) {
                filteredList = filteredList.filter(restaurant => {
                    console.log('Poen', new Date(restaurant.profile.open_time).toLocaleString())
                    console.log('Me', new Date(formattedDesiredDateTime).toLocaleString())
                    console.log('Closed', new Date(restaurant.profile.close_time).toLocaleString())
                    //Added +6 to evaluation because of time zone issues when creating restauratn data
                    if (100 * (new Date(restaurant.profile.open_time).getHours() + 6) + new Date(restaurant.profile.open_time).getMinutes() <= 100 * (new Date(formattedDesiredDateTime).getHours()) + new Date(formattedDesiredDateTime).getMinutes()
                        && 100 * (new Date(restaurant.profile.close_time).getHours() + 6) + new Date(restaurant.profile.close_time).getMinutes() >= 100 * (new Date(formattedDesiredDateTime).getHours()) + new Date(formattedDesiredDateTime).getMinutes()) {
                        //Remove advance notice time from inputted to see if it is far enough in the future
                        let desiredDate = new Date(formattedDesiredDateTime);
                        desiredDate.setHours(desiredDate.getHours() - restaurant.profile.advance_notice)
                        //If the date is still in the future (there is enough time to fulfill order)
                        return (desiredDate >= new Date());
                    }
                    return false;
                });
            } else {
                filteredList = filteredList.filter(restaurant => {
                    //Remove advance notice time from inputted to see if it is far enough in the future
                    let desiredDate = new Date(formattedDesiredDateTime);
                    console.log(desiredDate.toISOString())
                    desiredDate.setHours(desiredDate.getHours() - restaurant.profile.advance_notice)
                    //If the date is still in the future (there is enough time to fulfill order)
                    console.log(desiredDate.toISOString())
                    return (desiredDate >= new Date());
                });
            }

        }

        if (filters.includes('size') && size) {
            filteredList = filteredList.filter(restaurant =>
                (restaurant.profile.upper_order_bound >= size) && (size >= restaurant.profile.lower_order_bound));
        }

        setFilteredRestaurants(filteredList);
    };

    useEffect(() => {
        applyFilters();
    }, [filters, size, formattedDesiredDateTime, currTagFilters])

    const clearExistingDate = () => {
        setDesiredDate(null)
    }
    return (
        <div>
            <Header />

            <Onboard setOnboardOpen={setOnboardOpen} onboardOpen={onboardOpen} setDesiredDate={setDesiredDate} setSize={setSize} size={size} setAddress={setAddress} address={address} setDesiredTime={setDesiredTime} desiredDate={desiredDate} desiredTime={desiredTime} />

            <div className="main-filters">
                <NumberInput
                    className="size-input"
                    value={size}////////////////////////// Change to size or empty
                    onChange={(val) => setSize(val)}
                    placeholder="Size"
                    label="Party Size"
                    styles={{ input: { textAlign: 'center' } }}
                    hideControls
                />

                <NumberInput
                    className="restaurant-list-zip-code"
                    value={address}
                    onChange={(value) => setAddress(value)}
                    placeholder="Zip Code"
                    label="Zip Code"
                    maxLength={5}
                    styles={{ input: { textAlign: 'center' } }}
                    hideControls
                />

                <Button className="filter-button" onClick={openFilterDrawer}>
                    <FaFilter></FaFilter>
                    <div className="filter-name">Filters</div>
                </Button>
            </div>

            <div className="restaurant-list-date-time">
                <DatePicker
                    className="date-input"
                    label="Delivery Date"
                    placeholder="Select Delivery Date"
                    firstDayOfWeek="sunday"
                    onChange={(value) => {
                        setDesiredDate(value)
                        parseDesiredTime(desiredTime, value)
                    }}
                    onAuxClick={(value) => {
                        setDesiredDate(value)
                        parseDesiredTime(value, desiredDate)
                    }}
                    value={desiredDate}
                    minDate={new Date()}
                />
                <TimeInput
                    className="time-input"
                    label="Delivery Time"
                    format="12"

                    onChange={(value) => {

                        setDesiredTime(value)
                        parseDesiredTime(value, desiredDate)
                    }}

                    value={desiredTime}
                />
                {/* <DateTimePicker 
                    className="datetime-input"
                    name="Delivery Time"
                /> */}
            </div>

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
