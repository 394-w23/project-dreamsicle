import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import logo from '../logo.svg';

const Restaurant = ({ restaurant, set }) => {
    const { id } = useParams();
    const [count, setCount] = useState(0);
    const [restarauntID, setRestarauntID] = useState(0);
    const onClick = () => { setRestaurantID(restaurant.id) }

    return (
        <div className="App-header">
            <p>{restaurant.profile.name}</p>
            <Link to={`/${restaurant.id}`}>
                <div onClick={onClick}>Click Me</div>
            </Link>
        </div>);
}

export default Restaurant;