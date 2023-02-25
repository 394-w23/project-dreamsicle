import './TimeFilter.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { Badge, Button, Drawer, Input, NumberInput, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { FilterDrawer, typeOfDrawer } from './FilterDrawer';

const TimeFilter = ({ numberOfRestaurantsFound, filterDate, setFilterDate }) => {

    const [opened, setOpened] = useState(false);
    // const [filterDate, setFilterDate] = useState(); 
    const date = new Date()
    let initialTime = 100000;    // FIXME: Infinity variable doesn't work



    // Initially, show all restaraunts
    // useEffect(() => {
    //     if (!filterDate) {
    //         setTimeFilter(date.setHours(date.getHours() + initialTime));
    //         // setFilterDate(date.setHours(date.getHours() + initialTime));
    //     } else {
    //         setTimeFilter(date.setHours(date.getHours() + filterDate));
    //         // setFilterDate(date.setHours(date.getHours() + filterDate));
    //     }
    // }, [filterDate])

    return (
        <>
            <div onClick={() => setOpened(true)} className="filter-tag">
                <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>TIME FILTER {filterDate && ("(" + filterDate + ")")}</Badge>
            </div>

            <FilterDrawer opened={opened} setOpened={setOpened} filterFunction={setFilterDate} filterVariable={filterDate} typeOfDrawer={typeOfDrawer.TIME} numberOfRestaurantsFound={numberOfRestaurantsFound} />

        </>

    );



    // return (
    //      <div onClick={() => setTimeFilter(date)} className="filter-item"><RiTruckLine size={12} />
    //      TIME TIME</div>
    // );
}

export default TimeFilter