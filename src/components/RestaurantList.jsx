import { useEffect, useState } from 'react';
import Restaurant from './Restaurant';
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
import { DatePicker, TimeInput } from '@mantine/dates';
import moment from 'moment';
import { useScrollLock } from '@mantine/hooks';


const RestaurantList = ({ restaurants, onboardOpen, setOnboardOpen }) => {
    useScrollLock(onboardOpen);

    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
    const [currTagFilters, setCurrTagFilters] = useState([]);
    const [tempFilters, setTempFilters] = useState(currTagFilters);
    let { filters, setFilters } = useFilterStore(); /////////////////// using zustand store
    const [filterOpen, setFilterOpen] = useState(false);


    const [desiredDate, setDesiredDate] = useState("");
    const [desiredTime, setDesiredTime] = useState("");
    const [formattedDesiredDateTime, setFormattedDesiredDateTime] = useState("");
    const [filterDate, setFilterDate] = useState(null);
    const [size, setSize] = useState(10);
    const [address, setAddress] = useState("");


    // handle the event date and time
    function parseDesiredTime(desiredTime, desiredDate) {
        if (desiredTime && desiredDate) {
            let date = moment(desiredDate, "MM/DD/YYYY");
            let time = moment(desiredTime, "hh:mm a");
            let dateTime = date.add(time.hours(), 'hours').add(time.minutes(), 'minutes');
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
                if (restaurant.profile.tags && !restaurant.profile.tags || !restaurant.profile.tags.includes(filter)) {
                    return false;
                }
            }
            return true;
        });

        if (filters.includes('time') && formattedDesiredDateTime) {
            if (desiredTime) {
                filteredList = filteredList.filter(restaurant => {
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
                    desiredDate.setHours(desiredDate.getHours() - restaurant.profile.advance_notice)
                    //If the date is still in the future (there is enough time to fulfill order)
                    return (desiredDate >= new Date());
                });
            }

        }

        if (size !== 0) {
            filteredList = filteredList.filter(restaurant =>
                (restaurant.profile.upper_order_bound >= size) && (size >= restaurant.profile.lower_order_bound));
        }

        setFilteredRestaurants(filteredList);
    };

    useEffect(() => {
        applyFilters();
    }, [filters, size, formattedDesiredDateTime, currTagFilters])

    const clearDateTime = () => {
        setDesiredDate(null);
        setDesiredTime(null);
    };

    const clearSize = () => {
        setSize(0);
    };

    return (
        <div>
            <Header />

            <Onboard setOnboardOpen={setOnboardOpen} onboardOpen={onboardOpen} setSize={setSize} size={size} setAddress={setAddress} address={address} setDesiredTime={setDesiredTime} desiredDate={desiredDate} desiredTime={desiredTime} />

            <div className="main-filters">
                <NumberInput
                    className="size-input"
                    onChange={(val) => setSize(val)}
                    value={size}
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

            </div>
            <FilterSelector setFilterOpen={setFilterOpen} filterOpen={filterOpen} tags={tags} setCurrTagFilters={setCurrTagFilters} tempFilters={tempFilters} setTempFilters={setTempFilters} />

            <div className='tags'>
                {size !== 0 && <SizeFilter clearSize={clearSize} size={size} />}

                {desiredDate && <TimeFilter clearDateTime={clearDateTime} />}

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
