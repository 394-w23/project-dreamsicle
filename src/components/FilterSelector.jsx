// import './FilterSelector.css'
import { Button, Checkbox, Drawer, useMantineTheme } from '@mantine/core';
import { useState } from 'react';

const FilterSelector = ({ setFilterOpen, filterOpen, tags, setTagFilter }) => {
    const [filters, setFilters] = useState([]);

    const theme = useMantineTheme();
    
    const updateFilters = (tag) => {
        if (filters.includes(tag)) {
            filters.splice(filters.indexOf(tag), 1);
        } else {
            filters.push(tag);
        }
        isChecked(tag)
    };

    const isChecked = (tag) => {
        return filters.includes(tag);
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
                { tags.map(tag => <Checkbox label={tag} key={tag} tag={tag} onClick={() => updateFilters(tag)} />) }

                <Button onClick={() => setTagFilter(filters)}>Apply</Button>
                
            </Drawer>

            {/* <div onClick={() => setTagFilter(tag)} className="filter-tag">
                <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>{tag}</Badge>
            </div> */}
        </div>

    );
}

export default FilterSelector