import './FilterSelector.css'
import { Button, Checkbox, Drawer, useMantineTheme } from '@mantine/core';

const FilterSelector = ({ setFilterOpen, filterOpen, tags, setCurrTagFilters, tempFilters, setTempFilters }) => {

    const theme = useMantineTheme();
    
    const updateFilters = (tag) => {
        if (tempFilters.includes(tag)) {
            setTempFilters(tempFilters.filter(f => f !== tag));
        } else {
            setTempFilters([...tempFilters, tag])
        }
    };
    const setCurrTagFiltersAndCloseDrawer = (tempFilters) => {
        setFilterOpen(false);
        setCurrTagFilters(tempFilters)
    }
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

                <Button className="apply-button" onClick={() => setCurrTagFiltersAndCloseDrawer(tempFilters)}>Apply Filters</Button>

            </Drawer>
        </div>

    );
}

export default FilterSelector