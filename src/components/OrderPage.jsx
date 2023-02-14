import "./OrderPage.css";
import Header from './Header';
import { useDbData } from '../utils/firebase';
import OrderItem from "./OrderItem";
import { useParams } from "react-router";

const OrderPage = ({transactionID, restaurants}) => {
    console.log(transactionID)
    const [transaction, error] = useDbData(`/transactions/${transactionID}`);
    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if ((transaction  === undefined)  ) return <h1>Loading data...</h1>;
    if (!transaction) return <h1>No data found</h1>;
    const menu = []
    //flattens the menu_sections for a given restaurant
    Object.values(restaurants[transaction.restaurant].menu_sections).forEach(section => 
                                                                        section.items.forEach(item => menu.push(item)))
    let order =[];
    //create a list of all the items in our order
    Object.values(transaction.orders).forEach(i => {
        menu.forEach(m => console.log(m))
        order.push({item: menu.filter(menu_item => menu_item.id.toString() === i.item)[0], quantity: i.quantity})})

    //Retreive order items and informations

    // console.log(restaurants)
    return (
        <div className="order-page">
            <div>This you?{order.map( itemObj => <OrderItem item={itemObj.item} quantity={itemObj.quantity}/>)}</div>
        </div>
    );
};

export default OrderPage;