import './TimeFilter.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { Badge, Button, Drawer, Input, NumberInput, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { FilterDrawer, typeOfDrawer } from './FilterDrawer';
import { TiDelete } from '@react-icons/all-files/ti/TiDelete';

const TimeFilter = ({ clearDateTime, numberOfRestaurantsFound, filterDate, setFilterDate }) => {

    const [opened, setOpened] = useState(false);

    return (
        <>
            <div onClick={() => clearDateTime()} className="filter-tag">
                <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                    TIME FILTER
                    <TiDelete size="16" />
                </Badge>
            </div>

            {/* <FilterDrawer opened={opened} setOpened={setOpened} filterFunction={setFilterDate} filterVariable={filterDate} typeOfDrawer={typeOfDrawer.TIME} numberOfRestaurantsFound={numberOfRestaurantsFound} /> */}

        </>

    );

    // return (
    //      <div onClick={() => setTimeFilter(date)} className="filter-item"><RiTruckLine size={12} />
    //      TIME TIME</div>
    // );
}

export default TimeFilter