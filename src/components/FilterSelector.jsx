// import './FilterSelector.css'
import { Button, Checkbox, Drawer, useMantineTheme } from '@mantine/core';
import { useState } from 'react';

const FilterSelector = ({ setFilterOpen, filterOpen, tags, setTagFilter, currTagFilters }) => {
    const [filters, setFilters] = useState(currTagFilters);

    const theme = useMantineTheme();
    
    const updateFilters = (tag) => {
        if (filters.includes(tag)) {
            // filters.splice(filters.indexOf(tag), 1);
            setFilters(filters.filter((f => f !== tag)));
        } else {
            // filters.push(tag);
            setFilters([...filters, tag])
        }
    };

    return (
        <div>
            <Drawer
                opened={filterOpen}
                onClose={() => setFilterOpen(false)}
                title="Filter Restaurants"
                position="right"
                size="75%"
                className='filter-drawer'
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
                padding="lg"

            >
                { tags.map(tag => <Checkbox checked={filters.includes(tag)} onChange={(event) => event.currentTarget.checked} label={tag} key={tag} tag={tag} onClick={() => updateFilters(tag)} />) }

                <Button onClick={() => setTagFilter(filters)}>Apply</Button>

            </Drawer>

            {/* <div onClick={() => setTagFilter(tag)} className="filter-tag">
                <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>{tag}</Badge>
            </div> */}
        </div>

    );
}

export default FilterSelector