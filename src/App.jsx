import { useState } from 'react';
import logo from './logo.svg';
import { useDbData } from './utils/firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantPage from './components/RestaurantPage';
import RestaurantList from './components/RestaurantList';
import './App.css';
import OrderPage from './components/OrderPage';

const App = () => {
  const [data, error] = useDbData("/");
  const [cart,setCart] = useState({})

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/"
              element={<RestaurantList
              restaurants={Object.values(data.restaurants)}
              />}
            />
            <Route
              path="/:restaurant_id"
              element={<RestaurantPage
                restaurants={Object.values(data.restaurants)}
                setCart={setCart}
                cart={cart}
              />}
            />
            <Route
              path="/:restaraunt_id/:transaction_id"
              element={<OrderPage
                restaurants={Object.values(data.restaurants)}
              />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
