import './TimeFilter.css'
import QuantitySelector from './QuantitySelector';
import { DatePicker, TimeInput } from '@mantine/dates'
import { Button, Drawer, useMantineTheme } from '@mantine/core';


const Onboard = ({ setDesiredDate, setSize, size, setAddress, address, setDesiredTime, desiredDate, desiredTime }) => {
    const [raiseAlert, setRaiseAlert] = useState(false);
    const [open, setOpen] = useState(true);

    const theme = useMantineTheme();

    const validateInput = () => {
        let alarm = size <= 0 || address === "" || desiredDate === "" || desiredTime === ""
        setRaiseAlert(alarm)

        if (!alarm) {
            setOpen(false)
        }
    }
    return (
        <Drawer
            opened={open}
            onClose={validateInput}
            title="Filter Restaurants"
            position="bottom"
            size="auto"
            className='filter-drawer'
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            padding="lg"

        >
            <div className="date-time">
                <DatePicker required onChange={(value) => setDesiredDate(value)} value={desiredDate} placeholder="Pick Start Date" firstDayOfWeek="sunday" withAsterisk minDate={new Date()} />
                <TimeInput data-cy="add-event-start-time" onChange={(value) => setDesiredTime(value)} value={desiredTime} format="12"
                    required
                />
            </div>
            <QuantitySelector quantity={size} setQuantity={setSize} />
            <AddressInput setAddress={setAddress} />
            <Button onClick={validateInput}>Let's Order!</Button>
        </Drawer>
    );

    // return (
    //      <div onClick={() => setTimeFilter(date)} className="filter-item"><RiTruckLine size={12} />
    //      TIME TIME</div>
    // );
}

export default Onboard