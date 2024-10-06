import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import BankLandingPage from './landingPage';
import CustomerHomePage from './customerHomePage';
import DepositPage from './depositPage';
import FundTransfer from './transactionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<BankLandingPage/>}/>
        <Route path = "/customerHomepage" element = {<CustomerHomePage/>}/>
        <Route path = "/deposit" element = {<DepositPage/>}/>
        <Route path = "/transfer" element = {<FundTransfer/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
