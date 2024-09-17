import React, { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { ethers } from 'ethers';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import { CssBaseline } from '@mui/joy';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import theme from './theme';

function App() {
  const [account, setAccount] = useState(null); 
  const navigate = useNavigate(); 

 
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum); 
        const accounts = await provider.send('eth_requestAccounts', []); 
        setAccount(accounts[0]);
        localStorage.setItem('account', accounts[0]); 

       
        navigate('/dashboard');
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  
  useEffect(() => {
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      setAccount(storedAccount); 
    }
  }, []);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home account={account} setAccount={setAccount} connectWallet={connectWallet} />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard account={account} setAccount={setAccount} />} /> 
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
