import './TimeFilter.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { Badge, Button, Drawer, Input, NumberInput, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

const TimeFilter = ({ setTimeFilter, numberOfRestaurantsFound }) => {

    const [opened, setOpened] = useState(false);
    const [filterDate, setFilterDate] = useState(); // FIXME: Infinity variable doesn't work
    const date = new Date()
    let initialTime = 100000;


    // Initially, show all restaraunts
    useEffect(() => {
        if (!filterDate) {
            setTimeFilter(date.setHours(date.getHours() + initialTime));
        } else {
            setTimeFilter(date.setHours(date.getHours() + filterDate));
        }
    }, [filterDate])

    useEffect(() => {

        console.log(numberOfRestaurantsFound)
    }, [numberOfRestaurantsFound])


    // 
    // date.setHours(date.getHours()+ 25); ///////////////////////////////////////TODO: Hardwired User Inputted date object here

    return (
        <>
            <div onClick={() => setOpened(true)} className="filter-tag">
                <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>TIME FILTER</Badge>
            </div>

            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="Filter by time"
                padding="xl"
                // size="xl"
                position="bottom"
            >
                <NumberInput min={0} label="Advance Notice" value={filterDate} onChange={(value) => setFilterDate(value)} placeholder="Enter time in hours" />
                <Text align="center" style={{ marginTop: 50 }}>Found {numberOfRestaurantsFound} restaurants</Text>
               <div style={{textAlign: "center", marginTop: 20}}>
               <Button onClick={()=> setOpened(false)}>Done</Button>
               </div>
            </Drawer>
        </>

    );

    // return (
    //      <div onClick={() => setTimeFilter(date)} className="filter-item"><RiTruckLine size={12} />
    //      TIME TIME</div>
    // );
}

export default TimeFilter