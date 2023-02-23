import React from 'react'
import { Badge, Button, Drawer, Input, NumberInput, Text } from '@mantine/core';


export const typeOfDrawer = {
    SIZE: "size",
    TIME: "time"
}

export const FilterDrawer=({ opened, setOpened, numberOfRestaurantsFound, typeOfDrawer, filterVariable, filterFunction }) => {

    let label  = "";
    if(typeOfDrawer == typeOfDrawer.TIME){
        label = "Advance Notice"
    }else if(typeOfDrawer == typeOfDrawer.SIZE){
        label = "Number of People"
    }


    return (
        <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title={`Filter by ${typeOfDrawer}`}
            padding="xl"
            position="bottom"
        >
            <NumberInput min={0} label={label} value={filterVariable} onChange={(value) => filterFunction(value)} placeholder="Enter time in hours" />
            <Text align="center" style={{ marginTop: 50 }}>Found {numberOfRestaurantsFound} restaurants</Text>
            <div style={{ textAlign: "center", marginTop: 20 }}>
                <Button onClick={() => setOpened(false)}>Done</Button>
            </div>
        </Drawer>
    )
}


