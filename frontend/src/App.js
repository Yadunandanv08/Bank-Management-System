import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import BankLandingPage from './landingPage';
import CustomerHomePage from './customerHomePage';
import DepositPage from './depositPage';
import FundTransfer from './transactionPage';
import CheckBalance from './checkBalance';
import WithdrawPage from './withdrawPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<BankLandingPage/>}/>
        <Route path = "/customerHomepage" element = {<CustomerHomePage/>}/>
        <Route path = "/deposit" element = {<DepositPage/>}/>
        <Route path = "/transfer" element = {<FundTransfer/>}/>
        <Route path = "/balance" element = {<CheckBalance/>}/> 
        <Route path = "/withdraw" element = {<WithdrawPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
