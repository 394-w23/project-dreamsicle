import React, { useEffect } from 'react'
import { Badge, Button, Drawer, Input, useMantineTheme,NumberInput, Text } from '@mantine/core';
import { useFilterStore } from '../store/filterStore';


export const typeOfDrawer = {
    SIZE: "size",
    TIME: "time"
}

export const FilterDrawer = ({ opened, setOpened, numberOfRestaurantsFound, typeOfDrawer, filterVariable, filterFunction }) => {

    let { filters, setFilters } = useFilterStore();
    const theme = useMantineTheme();
    let label = "";
    let inputPlaceholder = ""
    if (typeOfDrawer == typeOfDrawer.TIME) {
        label = "Advance Notice";
        inputPlaceholder = "Enter time in hours";
    } else if (typeOfDrawer == typeOfDrawer.SIZE) {
        label = "Number of People";
        inputPlaceholder = "Enter group number";
    }

    /*
     *LOGIC for combining filters
    If you open the drawer and edit somehting, we add the filter to the filters in the zustand store
    IF you hit remove filter we remove it
     */

    useEffect(() => {
        console.log(filterVariable)
        if (filterVariable !== undefined) {
            if (!filters.includes(typeOfDrawer)) {
                setFilters([...filters, typeOfDrawer])
            }
        }
    }, [filterVariable])


    const removeFilter = () => {
        let newFilters = filters.filter(x => x != typeOfDrawer)
        setFilters(newFilters);
        setOpened(false);
        filterFunction();
    }
    
    return (
        <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title={`Filter by ${typeOfDrawer}`}
            padding="xl"
            position="bottom"
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
        >
            <NumberInput min={0} label={label} value={filterVariable} onChange={(value) => filterFunction(value)} placeholder={inputPlaceholder} />
            <Text align="center" style={{ marginTop: 50 }}>Found {numberOfRestaurantsFound} restaurants</Text>
        
            <div style={{ textAlign: "center", marginTop: 20 }}>
                <Button onClick={() => setOpened(false)}>Done</Button>
                <Button variant="subtle" onClick={removeFilter}>Clear Filter</Button>
            </div>
        </Drawer>
    )
}


