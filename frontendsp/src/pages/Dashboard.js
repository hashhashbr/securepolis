import React, { useState, useEffect } from 'react'; 
import { Box, Typography, Button, Input } from '@mui/joy'; 
import { createPolicy, viewPolicy, listPolicies } from '../services/contract'; 
import { ethers } from 'ethers'; 
import { useNavigate } from 'react-router-dom'; 

function Dashboard({ account, setAccount }) {
  const [policies, setPolicies] = useState([]); 
  const [policyId, setPolicyId] = useState(''); 
  const [insuredAddress, setInsuredAddress] = useState(''); 
  const [insuredAmount, setInsuredAmount] = useState(''); 
  const [premium, setPremium] = useState(''); 
  const [expirationDate, setExpirationDate] = useState(''); 
  const navigate = useNavigate(); 

 
  useEffect(() => {
    const loadPolicies = async () => {
      try {
        const policyList = await listPolicies(); 
        setPolicies(policyList); 
      } catch (error) {
        console.error('Error loading policies:', error);
      }
    };
    loadPolicies(); 
  }, []); 

  
  const handleCreatePolicy = async () => {
    if (!insuredAddress || !insuredAmount || !premium || !expirationDate) {
      alert('Fill in all fields to create a policy.');
      return;
    }
    try {
      const insuredAmountWei = ethers.parseEther(insuredAmount); 
      const premiumWei = ethers.parseEther(premium); 
      const tx = await createPolicy(insuredAddress, insuredAmountWei, premiumWei, expirationDate); // Cria a apólice
      await tx.wait(); 
      alert('Policy created succesfully!');
    } catch (error) {
      console.error('Error creating policy:', error);
    }
  };

  
  const handleViewPolicy = async () => {
    if (!policyId) {
      alert('Fill in the policy ID to view.');
      return;
    }
    try {
      const policy = await viewPolicy(policyId); 
      alert(`Policy Details: Insured - ${policy.insured}, Insured Value - ${ethers.formatEther(policy.insuredAmount)} ETH`);
    } catch (error) {
      console.error('Error viewing policy:', error);
    }
  };

  
  const handleDisconnect = () => {
    setAccount(null); 
    localStorage.removeItem('account'); 
    navigate('/'); 
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography level="h4" component="h1">Dashboard</Typography>
      <Typography level="body1" sx={{ marginTop: 2 }}>
        Connected Account: {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not Connected'}
      </Typography>

     
      <Box sx={{ marginTop: 4 }}>
        <Typography level="h5">Create Policy</Typography>
        <Input
          placeholder="Insured ETH Address"
          value={insuredAddress}
          onChange={(e) => setInsuredAddress(e.target.value)}
          fullWidth
        />
        <Input
          placeholder="Insured Value (ETH)"
          value={insuredAmount}
          onChange={(e) => setInsuredAmount(e.target.value)}
          fullWidth
        />
        <Input
          placeholder="Prize (ETH)"
          value={premium}
          onChange={(e) => setPremium(e.target.value)}
          fullWidth
        />
        <Input
          placeholder="Expiration Date (Timestamp)"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          fullWidth
        />
        <Button onClick={handleCreatePolicy} variant="solid" color="danger" sx={{ marginTop: 2 }}>
          Create Policy
        </Button>
      </Box>

      
      <Box sx={{ marginTop: 4 }}>
        <Typography level="h5">View Policy</Typography>
        <Input
          placeholder="Policy ID"
          value={policyId}
          onChange={(e) => setPolicyId(e.target.value)}
          fullWidth
        />
        <Button onClick={handleViewPolicy} variant="solid" color='danger' sx={{ marginTop: 2 }}>
          View Policy
        </Button>
      </Box>

      
      <Box sx={{ marginTop: 4 }}>
        <Typography level="h5">Policy History</Typography>
        {policies.length > 0 ? (
          <ul>
            {policies.map((policy, index) => (
              <li key={index}>
                ID: {index}, Insured: {policy.insured}, Insured Amount: {ethers.formatEther(policy.insuredAmount)} ETH, Prize: {ethers.formatEther(policy.premium)} ETH, Expiration: {new Date(policy.expirationDate * 1000).toLocaleDateString()}, Status: {policy.isActive ? 'Active' : 'Inactive'}
              </li>
            ))}
          </ul>
        ) : (
          <Typography>No Policy Found</Typography>
        )}
      </Box>

     
      <Box sx={{ marginTop: 4 }}>
        <Button onClick={handleDisconnect} variant="solid" color="danger">
          Disconnect Wallet
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;
