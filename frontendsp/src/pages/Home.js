import React from 'react';
import { Box, Typography, Button } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

function Home({ account, setAccount, connectWallet }) {
  const navigate = useNavigate(); 

  
  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum); 
        const accounts = await provider.send('eth_requestAccounts', []); 
        setAccount(accounts[0]); 
        localStorage.setItem('account', accounts[0]); 

        
        navigate('/dashboard');
      } catch (error) {
        console.error('Error connecting to Metamask:', error);
      }
    } else {
      alert('Instal Metamask to continue!');
    }
  };

  
  const disconnectWallet = () => {
    setAccount(null); 
    localStorage.removeItem('account'); 
    navigate('/'); 
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography level="h2" component="h1">Welcome to SecurePolis</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 4 }}>
        <Button component={Link} to="/about" variant="solid" color="danger">
          About
        </Button>

       
        {account ? (
          <Button onClick={disconnectWallet} variant="solid" color="danger">
            Disconnect Wallet ({`${account.slice(0, 6)}...${account.slice(-4)}`})
          </Button>
        ) : (
          <Button onClick={connectWalletHandler} variant="solid" color="danger">
            Connect Wallet
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Home;
