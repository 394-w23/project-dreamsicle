import './FilterItem.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"

const FilterItem = ({tag, setFilter}) => {

    return(
        <div onClick={() => setFilter(tag)} className="filter-item"><RiTruckLine size={12} />
        {tag}</div>
    );
}

export default FilterItem