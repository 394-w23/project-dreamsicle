import { Badge, Button, Drawer, Input, NumberInput, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
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

        </>

    );
}

export default TimeFilter