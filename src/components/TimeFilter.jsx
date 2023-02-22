import './TimeFilter.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { Badge } from '@mantine/core';

const TimeFilter = ({setTimeFilter}) => {
const date = new Date() 
date.setHours(date.getHours()+ 25); ///////////////////////////////////////TODO: Hardwired User Inputted date object here
    return(
        <div onClick={() => setTimeFilter(date)} className="filter-tag">
        <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>TIME FILTER(1 day)</Badge>
        </div>

    );

    // return (
    //      <div onClick={() => setTimeFilter(date)} className="filter-item"><RiTruckLine size={12} />
    //      TIME TIME</div>
    // );
}

export default TimeFilter