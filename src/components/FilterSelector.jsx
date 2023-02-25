import './FilterSelector.css'
import { Button, Checkbox, Drawer, useMantineTheme } from '@mantine/core';
import { useState } from 'react';

const FilterSelector = ({ setFilterOpen, filterOpen, tags, setCurrTagFilters, tempFilters, setTempFilters }) => {
    // const [filters, setFilters] = useState(currTagFilters);

    const theme = useMantineTheme();
    
    const updateFilters = (tag) => {
        if (tempFilters.includes(tag)) {
            // filters.splice(filters.indexOf(tag), 1);
            setTempFilters(tempFilters.filter(f => f !== tag));
        } else {
            // filters.push(tag);
            setTempFilters([...tempFilters, tag])
        }
    };

    return (
        <div>
            <Drawer
                opened={filterOpen}
                onClose={() => setFilterOpen(false)}
                title="Filter Restaurants"
                position="bottom"
                size="auto"
                className='filter-drawer'
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
                padding="lg"

            >
                
                { tags.map(tag => <Checkbox className="checkbox" checked={tempFilters.includes(tag)} onChange={(event) => event.currentTarget.checked} label={tag} key={tag} tag={tag} onClick={() => updateFilters(tag)} />) }

                <Button className="apply-button" onClick={() => setCurrTagFilters(tempFilters)}>Apply Filters</Button>

            </Drawer>

            {/* <div onClick={() => setTagFilter(tag)} className="filter-tag">
                <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>{tag}</Badge>
            </div> */}
        </div>

    );
}

export default FilterSelector