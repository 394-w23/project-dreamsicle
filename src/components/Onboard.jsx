import QuantitySelector from './QuantitySelector';
import { DatePicker, TimeInput } from '@mantine/dates'
import { Button, Drawer, useMantineTheme, TextInput, Alert, Input, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { BiErrorCircle } from "@react-icons/all-files/Bi/BiErrorCircle"
import "./Onboard.css";

const Onboard = ({ onboardOpen, setOnboardOpen, setDesiredDate, setSize, size, setAddress, address, setDesiredTime, desiredDate, desiredTime }) => {
    const [raiseAlert, setRaiseAlert] = useState(false);


    const theme = useMantineTheme();

    const validateInput = () => {
        console.log("size", size)
        console.log("address", address)
        let alarm = size === null || size <= 0 || address === ""
        // || desiredDate === "" || desiredTime === ""
        setRaiseAlert(alarm)

        if (!alarm) {
            setOnboardOpen(false)
        }
    }
    const initializeDefaultValues = () => {
        setSize(0)
        setAddress("")
        setOnboardOpen(false)
    }
    return (
        <Drawer
            opened={onboardOpen}
            onClose={initializeDefaultValues}
            position="bottom"
            size="100%"
            className='filter-drawer'
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            padding="lg"
        >
            <div className="onboard-content">
                {/* <Input.Wrapper style={{ marginBottom: 10 }} label="Schedule Delivery">
                <div className="date-time">
                    <DatePicker required onChange={(value) => setDesiredDate(value)} value={desiredDate} placeholder="Select date" firstDayOfWeek="sunday" withAsterisk minDate={new Date()} />
                    <TimeInput data-cy="add-event-start-time" onChange={(value) => setDesiredTime(value)} value={desiredTime} format="12"
                        required
                    />
                </div>
            </Input.Wrapper> */}

                <Input.Wrapper className="delivery-address" label="Delivery Zip Code" size="3.5vh">
                    <NumberInput value={address} onChange={(value) => setAddress(value)} maxLength={5} hideControls />
                </Input.Wrapper>
                <Input.Wrapper className="party-size" label="Party Size" size="3.5vh">
                    <div className="quantity-buttons">
                        <QuantitySelector quantity={size} setQuantity={setSize} />
                    </div>

                </Input.Wrapper>

                <div className="lets-order">
                    {raiseAlert && <Alert icon={<BiErrorCircle size={16} />} title="Missing Fields" color="red">
                        Complete the required fields
                    </Alert>}
                    <Button onClick={validateInput}>Let's Order!</Button>
                </div>


            </div>
        </Drawer>
    );

    // return (
    //      <div onClick={() => setTimeFilter(date)} className="filter-item"><RiTruckLine size={12} />
    //      TIME TIME</div>
    // );
}

export default Onboard