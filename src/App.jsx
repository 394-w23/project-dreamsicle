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
import TransactionList from './components/TransactionList';
import RestaurantItemUpstream from './components/RestaurantItemUpstream';
import { Loader } from '@mantine/core';
import ReturnConfirmationPage from './components/ReturnConfirmationPage';
const App = () => {
  const [data, error] = useDbData("/");
  const [onboardOpen, setOnboardOpen] = useState(false);
  // const [cart,setCart] = useState({})

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 100 }}>
    <h1 style={{ textAlign: "center" }}>Loading data...</h1>
    <Loader size="lg" />
  </div>

  if (!data) return <h1>No data found</h1>;
  const userId = 0; ///////////////////////////////////////////////////////////change later

  // let users = Object.values(data.users).filter(user =>(user.id===userId))
  let user = data.users[userId];
  // console.log("User test:", user)
  let restaurants = Object.values(data.restaurants);
  let transactions = Object.values(data.transactions).filter(transaction => transaction.user === user.id);  

  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/"
              element={<LoginPage setOnboardOpen={setOnboardOpen}
              />}
            />
            <Route
              path="/browse"
              element={<RestaurantList setOnboardOpen={setOnboardOpen} onboardOpen={onboardOpen}
                restaurants={restaurants}
              />}
            />
            <Route
              path="/browse/:restaurant_id"
              element={<RestaurantPage
                restaurants={restaurants}
                cart={user.cart}
              // setCart={setCart}
              // cart={cart}
              />}
            />
            <Route
              path="/orders/:restaraunt_id/:transaction_id"
              element={<OrderPage
                restaurants={restaurants}
              />}
            />
            <Route
              path="/orders"
              element={<TransactionList transactions={transactions} restaurants={restaurants}
              />}
            />
            {/* TODO: put the actual route */}
            <Route
              path="/returns"
              element={<ReturnPage
              />}
            />
            <Route
              path="/upstream"
              element={<RestaurantItemUpstream
              />}
            />
            <Route
              path="/returns/return-confirmation"
              element={<ReturnConfirmationPage
              />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
