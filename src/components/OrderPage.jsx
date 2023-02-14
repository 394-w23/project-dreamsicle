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

const OrderPage = ({ restaurants }) => {
    const transactionID = useParams().transaction_id
    const [currentState, setCurrentState] = useState(0);
    const [transaction, error] = useDbData(`/transactions/${transactionID}`);

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if ((transaction === undefined)) return <h1>Loading data...</h1>;
    if (!transaction) return <h1>No data found</h1>;

    const menu = []
    //flattens the menu_sections for a given restaurant
    Object.values(restaurants[transaction.restaurant].menu_sections).forEach(section =>
        section.items.forEach(item => menu.push(item)))
    let order = [];
    //create a list of all the items in our order
    Object.values(transaction.orders).forEach(i => {
        order.push({ item: menu.filter(menu_item => menu_item.id.toString() === i.item)[0], quantity: i.quantity })
    })
    let total_price = 0
    Object.values(transaction.orders).forEach(i => {
        total_price += i.quantity * (menu.filter(menu_item => menu_item.id.toString() === i.item)[0].price)
    })
    let rows = order.map((itemObj) => (
        <tr key={itemObj.item.id}>
            <td>{itemObj.item.name}</td>
            <td>{itemObj.quantity}</td>
            <td>${itemObj.item.price * itemObj.quantity}</td>
        </tr>
    ));
    rows.push(<tr key={0}>
        <td><span style={{ fontWeight: 'bold' }}>Total</span></td>
        <td></td>
        <td><span style={{ fontWeight: 'bold' }}>${total_price}</span></td>
    </tr>)

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
        <div className="order-page" onClick={nextState}>
            <div className="table">
                <Table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quanity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
            <div className="timeline">
                <Timeline active={currentState} bulletSize={24} lineWidth={2}>
                    <Timeline.Item bullet={<RiMailSendLine size={12} />} title="Sent">
                        {currentState >= 0 ? <><Text color="dimmed" size="sm">Your order has been sent to {restaurants[transaction.restaurant].profile.name}.</Text>
                            <Text size="xs" mt={4}>2 hours ago</Text></> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<RiCheckboxCircleLine size={12} />} title="Accepted">
                        {currentState >= 1 ? <><Text color="dimmed" size="sm">Your order has been accepted!</Text>
                            <Text size="xs" mt={4}>52 minutes ago</Text></> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<GiCookingPot size={12} />} title="Preparing">
                        {currentState >= 2 ? <><Text color="dimmed" size="sm">{restaurants[transaction.restaurant].profile.name} is currently preparing your order.</Text>
                            <Text size="xs" mt={4}>34 minutes ago</Text></> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<RiTruckLine size={12} />} title="Delivering">
                        {currentState >= 3 ? <><Text color="dimmed" size="sm">The delivery driver is on their way to your location.</Text>
                            <Text size="xs" mt={4}>12 minutes ago</Text></> : <></>}

                    </Timeline.Item>

                    <Timeline.Item bullet={<FaRegSmileBeam size={12} />} title="Delivered">
                        {currentState >= 4 ? <><Text color="dimmed" size="sm">Your order has been marked as delivered.</Text>
                            <Text size="xs" mt={4}>12 minutes ago</Text></> : <></>}

                    </Timeline.Item>
                </Timeline>
            </div>

        </div>
    );
};

export default OrderPage;