import { Card, NumberInput, TextInput, Select, Group, Text, Timeline, Title, Checkbox, Button, Input } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { FaRegSmileBeam } from '@react-icons/all-files/fa/FaRegSmileBeam';
import { GiCookingPot } from '@react-icons/all-files/gi/GiCookingPot';
import { RiCheckboxCircleLine } from '@react-icons/all-files/ri/RiCheckboxCircleLine';
import { RiMailSendLine } from '@react-icons/all-files/ri/RiMailSendLine';
import { RiTruckLine } from '@react-icons/all-files/ri/RiTruckLine';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useState } from 'react'
import Header from './Header'
import Navbar from './Navbar';
import "./ReturnPage.css";

export default function ReturnPage() {

  const [currentState, setCurrentState] = useState(0);
  const [returnItems, setReturnItems] = useState([]);
  const [returnDate, setReturnDate] = useState();
  const [returnTime, setReturnTime] = useState();
  const [validateReturn, setValidateReturn] = useState(false);

  // const [returnDateTime, setReturnDateTime] = useState({date: new Date(), time: ""});

  const nextState = () => {
    if (currentState < 4) {
      setCurrentState(currentState + 1)
    } else {
      setCurrentState(0)
    }
  }

  return (
    <div className="return-page">
      <Header />
      <div>
        <Title style={{ color: "black", marginBottom: "2vh" }} order={2}>Schedule Return</Title>
        <div className="inputs">
          <div className="phone-name">
            <TextInput
              placeholder="Name"
              label="Name"
              className="name"
            />
            <NumberInput
              placeholder="Phone Number"
              label="Phone Number"
              hideControls
            />
          </div>
          <TextInput
            placeholder="Address"
            label="Address"
          />
          <div className="date-time">
            <DatePicker className="date" label="Pickup Date" placeholder="Pick a Date" minDate={moment(new Date()).toDate()} value={returnDate} onChange={setReturnDate} />
            <Select
              label="Pickup Time Range"
              placeholder="Pick a Time Range"
              data={[
                { value: 8, label: '8:00am-9:00am' },
                { value: 9, label: '9:00am-10:00am' },
                { value: 10, label: '10:00am-11:00am' },
                { value: 11, label: '11:00am-12:00pm' },
                { value: 12, label: '12:00pm-1:00pm' },
                { value: 13, label: '1:00pm-2:00pm' },
                { value: 14, label: '2:00pm-3:00pm' },
                { value: 15, label: '3:00pm-4:00pm' },
                { value: 16, label: '4:00pm-5:00pm' },
                { value: 17, label: '5:00pm-6:00pm' },
                { value: 18, label: '6:00pm-7:00pm' },
                { value: 19, label: '7:00pm-8:00pm' },
              ]}
            />
          </div>
        </div>




      </div>
      <Card radius="md" style={{ marginBottom: 20 }}>
        {/* <Title style={{ paddingTop: 10, paddingBottom: 10 }} order={2}>Return Checklist</Title> */}
        <Checkbox.Group
          defaultValue={[]}
          label="Please Return the Following Items: "
          orientation='vertical'
          value={returnItems}
          onChange={setReturnItems}
        >
          {["5 Serving Platters", "20 Utensil Packs (Fork, Knife, Spoon)", "20 Plates"].map((x, key) =>
            <Checkbox key={key} value={`item${x}`} label={x} />
          )
          }
        </Checkbox.Group>
      </Card>

      <div style={{ textAlign: "center" }}>
        <Checkbox label="I acknowledge that missing items will result in a fee from my $50 deposit." onChange={() => setValidateReturn(validateReturn => !validateReturn)}>
        </Checkbox>
        <div>{
          validateReturn
          ?<Button>Schedule Return</Button>
          :<Button disabled>Schedule Return</Button>
          }
        </div>
      </div>
      {/* <div className="timeline" onClick={nextState}>
        <Timeline active={currentState} bulletSize={24} lineWidth={2}>
          <Timeline.Item bullet={<RiMailSendLine size={12} />} title="Submitted">
            {currentState >= 0 ? <><Text color="dimmed" size="sm">Your order has been submitted to!</Text>
              <Text size="xs" mt={4}>2 hours ago</Text></> : <></>}
          </Timeline.Item>

          <Timeline.Item bullet={<RiCheckboxCircleLine size={12} />} title="Accepted">
            {currentState >= 1 ? <><Text color="dimmed" size="sm">Your order has been accepted!</Text>
              <Text size="xs" mt={4}>52 minutes ago</Text></> : <></>}
          </Timeline.Item>

          <Timeline.Item bullet={<GiCookingPot size={12} />} title="Preparing">
            {currentState >= 2 ? <><Text color="dimmed" size="sm">is currently preparing your order!</Text>
              <Text size="xs" mt={4}>34 minutes ago</Text></> : <></>}
          </Timeline.Item>

          <Timeline.Item bullet={<RiTruckLine size={12} />} title="Delivering">
            {currentState >= 3 ? <><Text color="dimmed" size="sm">The delivery driver is on their way to your location!</Text>
              <Text size="xs" mt={4}>12 minutes ago</Text></> : <></>}
          </Timeline.Item>

          <Timeline.Item bullet={<FaRegSmileBeam size={12} />} title="Delivered">
            {currentState >= 4 ? <><Text color="dimmed" size="sm">Your order has been delivered!</Text>
              <Text size="xs" mt={4}>12 minutes ago</Text></> : <></>}
          </Timeline.Item>
        </Timeline>
      </div> */}

      <Navbar />
    </div>
  )
}
