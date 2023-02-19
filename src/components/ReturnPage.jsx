import { Card, Group, Text, Timeline, Title } from '@mantine/core';
import { FaRegSmileBeam } from '@react-icons/all-files/fa/FaRegSmileBeam';
import { GiCookingPot } from '@react-icons/all-files/gi/GiCookingPot';
import { RiCheckboxCircleLine } from '@react-icons/all-files/ri/RiCheckboxCircleLine';
import { RiMailSendLine } from '@react-icons/all-files/ri/RiMailSendLine';
import { RiTruckLine } from '@react-icons/all-files/ri/RiTruckLine';
import React, { useState } from 'react'
import Header from './Header'

export default function ReturnPage() {

  const [currentState, setCurrentState] = useState(0);

  const nextState = () => {
    if (currentState < 4) {
        setCurrentState(currentState + 1)
    } else {
        setCurrentState(0)
    }
}


  return (
    <div style={{paddingTop: 100, height: "100vh", }}>
        <Header />
        <Card>
          
          <Title size="medium">Return Checklist</Title>
          <Group>
            
          </Group>

        </Card>


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
    </div>
  )
}