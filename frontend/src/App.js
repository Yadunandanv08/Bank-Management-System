import React from 'react';
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
}

export default App;
