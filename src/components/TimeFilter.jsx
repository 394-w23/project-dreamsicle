import './TimeFilter.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"

const TimeFilter = ({setTimeFilter}) => {
const date = new Date() 
date.setHours(date.getHours()+ 25); ///////////////////////////////////////TODO: Hardwired User Inputted date object here
    return(
        <div onClick={() => setTimeFilter(date)} className="filter-item"><RiTruckLine size={12} />
        TIME TIME</div>
    );
}

export default TimeFilter