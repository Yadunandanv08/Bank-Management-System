/*<<<<<<< Updated upstream*/
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import BankLandingPage from './landingPage';

/*function App() {
  const [data, setData] = useState([{}]);
  return (
    <BrowserRouter>
      <BankLandingPage />
    </BrowserRouter>
  );
import React from 'react';*/
/*<<<<<<< HEAD*/
/*import BankLandingPage from './landingPage';*/
import Homepage from './Homepage';
/*import { BrowserRouter, Routes, Route } from 'react-router-dom';*/



/*function App() {
    return (
        <BrowserRouter>
            <Routes>
              <Route path='/' element = {<BankLandingPage/>}/> 
              <Route path='Homepage' element = {<Homepage/>}/> 
            </Routes>
        </BrowserRouter>
    );*/
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import BankLandingPage from './landingPage';
import CustomerHomePage from './customerHomePage';
import DepositPage from './depositPage';
import FundTransfer from './transactionPage';
import CheckBalance from './checkBalance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<BankLandingPage/>}/>
        <Route path = "/customerHomepage" element = {<CustomerHomePage/>}/>
        <Route path = "/deposit" element = {<DepositPage/>}/>
        <Route path = "/transfer" element = {<FundTransfer/>}/>
        <Route path = "/balance" element = {<CheckBalance/>}/> 
      </Routes>
    </BrowserRouter>
  );
  /* 323991bc605c8c887b46f5fc7dfa15b42b4dd32a*/
/*>>>>>>> Stashed changes*/
}

export default App;
