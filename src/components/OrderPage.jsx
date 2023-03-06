import "./OrderPage.css";
import Header from './Header';
import { useDbData } from '../utils/firebase';
import OrderItem from "./OrderItem";
import { useParams } from "react-router";
import { useState } from "react";
import { Timeline, Text, Table } from '@mantine/core';
import { RiMailSendLine } from "@react-icons/all-files/ri/RiMailSendLine"
import { RiCheckboxCircleLine } from "@react-icons/all-files/ri/RiCheckboxCircleLine"
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { FaRegSmileBeam } from "@react-icons/all-files/fa/FaRegSmileBeam"
import { GiCookingPot } from "@react-icons/all-files/gi/GiCookingPot"
import { menuItemParser } from "../utils/helper";
import OrderTable from "./OrderTable";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import BackButton from "./BackButton";


const OrderPage = ({ restaurants }) => {
    const transactionID = useParams().transaction_id
    const [currentState, setCurrentState] = useState(0);
    const [transaction, error] = useDbData(`/transactions/${transactionID}`);
    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if ((transaction === undefined)) return <h1>Loading data...</h1>;
    if (!transaction) return <h1>No data found</h1>;
    const restaurant = restaurants[transaction.restaurant]


    // const rows=order.map(itemObj => <OrderItem key={itemObj.item.id} item={itemObj.item} quantity={itemObj.quantity} />)
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
            <BackButton />

            <div className="table">
                <OrderTable restaurant={restaurant} cartData={transaction} />

            </div>
            <div className="timeline" onClick={nextState}>
                <Timeline active={currentState} bulletSize={24} lineWidth={2}>
                    <Timeline.Item bullet={<RiMailSendLine size={12} />} title="Submitted">
                        {currentState >= 0 ? <><Text color="dimmed" size="sm">Your order has been submitted to {restaurants[transaction.restaurant].profile.name}!</Text>
                        </> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<RiCheckboxCircleLine size={12} />} title="Accepted">
                        {currentState >= 1 ? <><Text color="dimmed" size="sm">Your order has been accepted! If you would like to schedule a return now, you can do that <Link to={'/returns'}>Here</Link></Text>
                        </> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<GiCookingPot size={12} />} title="Preparing">
                        {currentState >= 2 ? <><Text color="dimmed" size="sm">{restaurants[transaction.restaurant].profile.name} is currently preparing your order!</Text>
                        </> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<RiTruckLine size={12} />} title="Delivering">
                        {currentState >= 3 ? <><Text color="dimmed" size="sm">The delivery driver is on their way to your location!</Text>
                        </> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<FaRegSmileBeam size={12} />} title="Delivered">
                        {currentState >= 4 ? <><Text color="dimmed" size="sm">Your order has been delivered!</Text>
                            <Text size="xs" mt={4}>12 minutes ago</Text></> : <></>}

                    </Timeline.Item>
                </Timeline>
            </div>
            <Navbar />
        </div>
    );
};

export default OrderPage;