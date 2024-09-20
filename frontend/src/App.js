import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import BankLandingPage from './landingPage';

function App() {
  const [data, setData] = useState([{}]);
  return (
    <BrowserRouter>
      <BankLandingPage />
    </BrowserRouter>
  );
}

export default App;
