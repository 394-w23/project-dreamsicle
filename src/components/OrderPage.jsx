import "./OrderPage.css";
import Header from './Header';
import { useDbData } from '../utils/firebase';
import OrderItem from "./OrderItem";
import { useParams } from "react-router";
import { useState } from "react";

const OrderPage = ({ restaurants }) => {
    const transactionID = useParams().transaction_id
    const [currentState, setCurrentState] = useState("");
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
    const nextState = () => {
        if(currentState === "" ){
            setCurrentState("preparing")
        }
        else if(currentState === "preparing"){
            setCurrentState("delivering")
        }
        else if(currentState === "delivering"){
            setCurrentState("")
        }
        else {
            setCurrentState("")
        }
    }

    //TODO: Hardcoded delivery time
    let minutes = 34;
    return (
        <div className="order-page" onClick={nextState}>
            <div>
                {currentState === "" && <div>Order Received!</div>}
                {order.map(itemObj => <OrderItem item={itemObj.item} quantity={itemObj.quantity} />)}
            </div>
            {
            currentState === "preparing" ?
                (<div>
                    Preparing Order...
                </div>)
            : currentState === "delivering" ?
                    (<div>
                        Expected Delivery {minutes} minutes
                    </div>)
            : (<div></div>)
                    }
        </div>
    );
};

export default OrderPage;