import "./OrderPage.css";
import Header from '../Navigation/Header';
import { useDbData } from '../../utils/firebase';
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Timeline, Text, Button } from '@mantine/core';
import { RiMailSendLine } from "@react-icons/all-files/ri/RiMailSendLine"
import { RiCheckboxCircleLine } from "@react-icons/all-files/ri/RiCheckboxCircleLine"
import { RiTruckLine } from "@react-icons/all-files/ri/RiTruckLine"
import { FaRegSmileBeam } from "@react-icons/all-files/fa/FaRegSmileBeam"
import { GiCookingPot } from "@react-icons/all-files/gi/GiCookingPot"
import { Link } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import BackButton from "../Navigation/BackButton";
import { useReturnsStore } from "../../store/returnsStore";
import { useTransactionStore } from "../../store/transactionsStore";
import OrderTable from "./OrderTable";

const OrderPage = ({ restaurants }) => {

    const { setShowReturnConfirmation } = useReturnsStore();
    const { latestTransaction } = useTransactionStore(); // to show that the item has been delivered already

    useEffect(() => {
        if (latestTransaction !== transactionID) {
            setCurrentState(4)
        }
    }, [])

    const transactionID = useParams().transaction_id
    const [currentState, setCurrentState] = useState(0);
    const [transaction, error] = useDbData(`/transactions/${transactionID}`);
    useEffect(() => {
        if (transaction && ((new Date())-(new Date(transaction.datetime)))<1000000) {
            setCurrentState(0)
        }
    }, [transaction])

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if ((transaction === undefined)) return <h1>Loading data...</h1>;
    if (!transaction) return <h1>No data found</h1>;
    const restaurant = restaurants[transaction.restaurant]
    

    

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
        <div>
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
                            {currentState >= 1 ? <><Text color="dimmed" size="sm">Your order has been accepted! If you would like to schedule a return now, click below. </Text>
                                <Link to={'/returns'}><Button size="sm" onClick={() => setShowReturnConfirmation(false)}>Schedule Return Now</Button></Link>
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
                            </> : <></>}

                        </Timeline.Item>
                    </Timeline>
                </div>
            </div>
            <Navbar />

        </div>
    );
};

export default OrderPage;