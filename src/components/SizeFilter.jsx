import './SizeFilter.css'
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"

const SizeFilter = ({setOrderSize}) => {
    return(/////////////////////////////////////////////////////////////TODO: HARD CODED ORDER SIZE
        <div onClick={() => setOrderSize(10)} className="filter-item"><RiTruckLine size={12} />
        SIZE SIZE</div>
    );
}

export default SizeFilter