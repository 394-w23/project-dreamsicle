import { Badge } from '@mantine/core';
import { TiDelete } from '@react-icons/all-files/ti/TiDelete';

const SizeFilter = ({ size, clearSize }) => {
    return (
        <>
            <div onClick={() => clearSize()} className="filter-tag">
                <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                    SIZE FILTER {!size ? '':`(${size})`} 
                    <TiDelete size="16" />
                </Badge>
            </div>
        
        </>
    );
}

export default SizeFilter