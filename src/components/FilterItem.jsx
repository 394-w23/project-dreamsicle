import './FilterItem.css';
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine";
import { TiDelete } from "@react-icons/all-files/ti/TiDelete";
import { Badge } from '@mantine/core';

const FilterItem = ({ tag, removeFilterTag }) => {

  return (
    // <div onClick={() => setTagFilter(tag)} className="filter-tag">
    <div onClick={() => removeFilterTag(tag)} className="filter-tag">
      <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
        {tag}
        <TiDelete size="16" />
      </Badge>
    </div>
  );

  // return(
  //     <div onClick={() => setTagFilter(tag)} className="filter-item"><RiTruckLine size={12} />
  //     {tag}</div>
  // );
}

export default FilterItem