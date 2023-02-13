import { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Restaurant from './Restaurant';
import logo from '../logo.svg';

const RestaurantList = ({ restaurants }) => {
    const { id } = useParams();

    const [count, setCount] = useState(0);

    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {restaurants.map(r => <Restaurant restaurant={r} />)}


        </div>);
}

export default RestaurantList;