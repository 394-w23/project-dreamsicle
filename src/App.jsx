import { useState } from 'react';
import logo from './logo.svg';
import { useDbData } from './utils/firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantPage from './components/RestaurantPage';
import RestaurantList from './components/RestaurantList';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);
  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div className="App">
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
              path="/:restaraunt_id"
              element={<RestaurantPage
              />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
