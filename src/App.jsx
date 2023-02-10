import { useState } from 'react';
import logo from './logo.svg';
import { useDbData } from './utils/firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestarauntPage from './components/RestarauntPage';
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Vite + React!</p>
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
        </header>
        <div>
        <Routes>
            <Route
              path="/:restaraunt_id"
              element={<RestarauntPage
              />}
            />
            </Routes>
            </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
