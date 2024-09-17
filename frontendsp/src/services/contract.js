import { ethers } from 'ethers';
import contractAbi from '../services/SecurePolis.json';
export const contractAddress = '0xaf127b54df89dd4d753110f90c5f5d5b9e1ebb08';
export const contractABI = contractAbi.abi;


export const getContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  } else {
    alert('Please install MetaMask');
  }
};


export const createPolicy = async (insuredAddress, insuredAmount, premium, expirationDate) => {
  const contract = await getContract();
  const tx = await contract.createPolicy(insuredAddress, insuredAmount, premium, expirationDate);
  await tx.wait();
  return tx;
};


export const viewPolicy = async (policyId) => {
  const contract = await getContract();
  const policy = await contract.viewPolicy(policyId);
  return policy;
};


export const listPolicies = async () => {
  const contract = await getContract();
  const policyCount = await contract.policyCount();
  const policies = [];

  for (let i = 0; i < policyCount; i++) {
    const policy = await contract.viewPolicy(i);
    policies.push(policy);
  }

  return policies;
};
