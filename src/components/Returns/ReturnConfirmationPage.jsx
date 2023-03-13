import { useState } from "react";
import { Timeline, Text, Card } from '@mantine/core';
import { RiMailSendLine } from "@react-icons/all-files/ri/RiMailSendLine"
import { RiCheckboxCircleLine } from "@react-icons/all-files/ri/RiCheckboxCircleLine"
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { FaRegSmileBeam } from "@react-icons/all-files/fa/FaRegSmileBeam"
import { GiCookingPot } from "@react-icons/all-files/gi/GiCookingPot"
import Navbar from '../Navigation/Navbar';
import './ReturnConfirmationPage.css'
import Header from '../Navigation/Header';

const ReturnConfirmationPage = () => {
    const [currentState, setCurrentState] = useState(0);

    const nextState = () => {
        if (currentState < 4) {
            setCurrentState(currentState + 1)
        } else {
            setCurrentState(0)
        }
    }




    //TODO: Hardcoded delivery time
    let minutes = 34;
    return (
        <div className="order-page">
            <Header />
            <h1>Confirmation</h1>
            <Card className="return-blurb">
                Congratulations for helping to keep single-use plastic out of the landfill! <br></br><br></br> Did you know that a single reusable container reduces solid waste by up to 86%. By doing this for your large order, you've reduced a lot of waste!
            </Card>
            <div className="">
                <div>{currentState >= 4 ? "Returned Items" : "Items to be Returned"}
                    <ul>
                        <li>5 Serving Platters</li>
                        <li>20 Utensil Packs (Fork, Knife, Spoon)</li>
                        <li>20 Plates</li>
                    </ul>




                </div>
            </div>
            <div className="timeline" onClick={nextState}>
                <Timeline active={currentState} bulletSize={24} lineWidth={2}>
                    <Timeline.Item bullet={<RiMailSendLine size={12} />} title="Scheduled">
                        {currentState >= 0 ? <><Text color="dimmed" size="sm">Your return has been scheduled!</Text>
                        </> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<RiCheckboxCircleLine size={12} />} title="Confirmed">
                        {currentState >= 1 ? <><Text color="dimmed" size="sm">Your return has been confirmed!</Text>
                        </> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<RiTruckLine size={12} />} title="On the way">
                        {currentState >= 2 ? <><Text color="dimmed" size="sm">Our team is on the way to pick up your return.</Text>
                        </> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<GiCookingPot size={12} />} title="Pickup">
                        {currentState >= 3 ? <><Text color="dimmed" size="sm">Your reusable items return has been picked up.</Text>
                        </> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<FaRegSmileBeam size={12} />} title="Complete">
                        {currentState >= 4 ? <><Text color="dimmed" size="sm">You're all set!</Text>
                            <Text size="xs" mt={4}>Your refund will be deposited in 3-5 business days</Text></> : <></>}

                    </Timeline.Item>
                </Timeline>
            </div>
            <Navbar />
        </div>
    );
};

export default ReturnConfirmationPage;