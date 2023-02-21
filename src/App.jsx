import { useState } from 'react';
import logo from './logo.svg';
import { useDbData } from './utils/firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantPage from './components/RestaurantPage';
import RestaurantList from './components/RestaurantList';
import './App.css';
import OrderPage from './components/OrderPage';
import LoginPage from './components/LoginPage';
import ReturnPage from './components/ReturnPage';

const App = () => {
  const [data, error] = useDbData("/");
  // const [cart,setCart] = useState({})

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  const userId = 0; ///////////////////////////////////////////////////////////change later

  let restaurants = Object.values(data.restaurants)
  // let users = Object.values(data.users).filter(user =>(user.id===userId))
  let user = data.users[userId]
  // console.log("User test:", user)  

  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
          <Route
              path="/"
              element={<LoginPage
              />}
            />
            <Route
              path="/browse"
              element={<RestaurantList
              restaurants={restaurants}
              />}
            />
            <Route
              path="/:restaurant_id"
              element={<RestaurantPage
                restaurants={restaurants}
                cart={user.cart}
                // setCart={setCart}
                // cart={cart}
              />}
            />
            <Route
              path="/:restaraunt_id/:transaction_id"
              element={<OrderPage
                restaurants={restaurants}
              />}/>
              {/* TODO: put the actual route */}
            <Route
              path="/returns"
              element={<ReturnPage
              />}
            />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
