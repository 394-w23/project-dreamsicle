import "./OrderPage.css";
import Header from './Header';
import { useDbData } from '../utils/firebase';

const OrderPage = ({transactionID}) => {
    const [data, error] = useDbData(`/transactions/${transactionID}`);
    
    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (data === undefined) return <h1>Loading data...</h1>;
    if (!data) return <h1>No data found</h1>;

    console.log(data)
    return (
        <div className="order-page">
            <Header />
            <div>This you?</div>
        </div>
    );
};

export default OrderPage;