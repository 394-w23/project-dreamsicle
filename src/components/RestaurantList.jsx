import { useState } from 'react';
import { useParams } from "react-router-dom";
import logo from '../logo.svg';

const RestaurantList = ({restaurants}) => {
    const { id } = useParams();

    const [count, setCount] = useState(0);

    return (<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React! {restaurants[0].profile.name}</p>
        <p>
            <button onClick={() => setCount(count => count + 1)}>
                count is: {count}
            </button>
        </p>
        <p>
            Edit <code>App.jsx</code> and save to test hot module replacement (HMR).
        </p>
        <p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            {' | '}
            <a
                className="App-link"
                href="https://vitejs.dev/guide/features.html"
                target="_blank"
                rel="noopener noreferrer"
            >
                Vite Docs
            </a>
        </p>
    </header>);
}

export default RestaurantList;