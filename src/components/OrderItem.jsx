import './OrderItem.css'

const OrderItem = ({item, quantity}) => {

    
    console.log(item)
    return (
        <div className="order-page">
            <div>{item.name}</div>
            <div>{quantity}</div>
        </div>
    );
};

export default OrderItem;