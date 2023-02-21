import './FilterItem.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { Badge } from '@mantine/core';

const FilterItem = ({tag, setTagFilter}) => {

    return(
    <div onClick={() => setTagFilter(tag)} className="filter-tag">
      <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>{tag}</Badge>
    </div>
    );

    // return(
    //     <div onClick={() => setTagFilter(tag)} className="filter-item"><RiTruckLine size={12} />
    //     {tag}</div>
    // );
}

export default FilterItem