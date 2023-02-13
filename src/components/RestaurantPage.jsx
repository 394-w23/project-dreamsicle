import { Link } from "react-router-dom";

const RestaurantPage = ({restaurant, restaurantID}) => {
    const orderID = '10'

    return (
        <Link to={`/${restaurant.id}/${orderID}`}>
            <div>Rest</div>
        </Link>

    );
};

export default RestaurantPage
