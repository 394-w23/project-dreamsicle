const OrderItem = ({item, quantity}) => {

    
    return (
        <div className="order-page">
            <div>{item.name}</div>
            <div>{quantity}</div>
        </div>
    );
};

export default OrderItem;