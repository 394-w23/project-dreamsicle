import { Card, Group, Text, Timeline, Title, Checkbox, Button, Input } from '@mantine/core';
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

export default function ReturnPage() {

  const [currentState, setCurrentState] = useState(0);
  const [returnItems, setReturnItems] = useState([]);
  const [returnDate, setReturnDate] = useState();
  const [returnTime, setReturnTime] = useState();

  // const [returnDateTime, setReturnDateTime] = useState({date: new Date(), time: ""});



  const nextState = () => {
    if (currentState < 4) {
      setCurrentState(currentState + 1)
    } else {
      setCurrentState(0)
    }
  }



  return (
    <div style={{ paddingTop: 100, height: "100vh", }}>
      <Header />      
      <div style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <Title style={{ paddingTop: 10, paddingBottom: 10 }} order={2}>Return Date</Title>
        <DatePicker label="Pick a date"   minDate={moment(new Date()).toDate()} value={returnDate} onChnage={setReturnDate}/>
        <TimeInput label="Enter time" format="12" value={returnTime} onChnage={setReturnTime}/>
      </div>
      <Card radius="md" style={{ marginBottom: 20 }}>
        <Title style={{ paddingTop: 10, paddingBottom: 10 }} order={2}>Return Checklist</Title>
        <Checkbox.Group
          defaultValue={[]}
          label="Here is a checklist to help you add all the items to your return"
          orientation='vertical'
          value={returnItems}
          onChange={setReturnItems}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x, key) =>
            <Checkbox key={key} value={`item${x}`} label={`Return Item ${x}`} />
          )
          }
        </Checkbox.Group>
      </Card>

      <div style={{ textAlign: "center", paddingBottom: 20 }}>
        <Button >Start Return</Button>
      </div>
      <div className="timeline" onClick={nextState}>
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
      </div>

      <Navbar />
    </div>
  )
}
