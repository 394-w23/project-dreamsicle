import './FilterItem.css';
import { TiDelete } from "@react-icons/all-files/ti/TiDelete";
import { Badge } from '@mantine/core';

const FilterItem = ({ tag, removeFilterTag }) => {
  
  return (
    <div onClick={() => removeFilterTag(tag)} className="filter-tag">
      <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
        {tag}
        <TiDelete size="16" />
      </Badge>
    </div>
  );
}

export default FilterItem