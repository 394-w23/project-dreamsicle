import { Badge } from '@mantine/core';
import { TiDelete } from '@react-icons/all-files/ti/TiDelete';

const TimeFilter = ({ clearDateTime }) => {
    return (
        <>
            <div onClick={() => clearDateTime()} className="filter-tag">
                <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                    TIME FILTER
                    <TiDelete size="16" />
                </Badge>
            </div>

        </>

    );
}

export default TimeFilter