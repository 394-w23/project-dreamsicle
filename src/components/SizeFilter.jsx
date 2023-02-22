import './SizeFilter.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { Badge } from '@mantine/core';

const SizeFilter = ({ setOrderSize }) => {

    return (/////////////////////////////////////////////////////////////TODO: HARD CODED ORDER SIZE
        <div onClick={() => setOrderSize(10)} className="filter-tag">
            <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>SIZE FILTER(10)</Badge>
        </div>
    );

    // return(/////////////////////////////////////////////////////////////TODO: HARD CODED ORDER SIZE
    //     <div onClick={() => setOrderSize(10)} className="filter-item"><RiTruckLine size={12} />
    //     SIZE SIZE</div>
    // );
}

export default SizeFilter