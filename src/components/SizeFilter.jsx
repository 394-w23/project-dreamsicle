import './SizeFilter.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { Badge } from '@mantine/core';
import { FilterDrawer, typeOfDrawer } from './FilterDrawer';
import { useEffect } from 'react';
import { useState } from 'react';

const SizeFilter = ({ size,setOrderSize, numberOfRestaurantsFound }) => {

    // const [filterSize, setFilterSize] = useState();
    const [opened, setOpened] = useState();

    // useEffect(()=>{
    //     if(filterSize){
    //         setOrderSize(filterSize);
    //     }else{
    //         setOrderSize();
    //     }
    // },[filterSize])


    return (/////////////////////////////////////////////////////////////TODO: HARD CODED ORDER SIZE
    <>
        <div onClick={() => setOpened(true)} className="filter-tag">
            <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>SIZE FILTER ({size})</Badge>
        </div>
        <FilterDrawer opened={opened} setOpened={setOpened} filterVariable={size} filterFunction={setOrderSize} numberOfRestaurantsFound={numberOfRestaurantsFound} typeOfDrawer={typeOfDrawer.SIZE}/>
        </>
    );

    // return(/////////////////////////////////////////////////////////////TODO: HARD CODED ORDER SIZE
    //     <div onClick={() => setOrderSize(10)} className="filter-item"><RiTruckLine size={12} />
    //     SIZE SIZE</div>
    // );
}

export default SizeFilter