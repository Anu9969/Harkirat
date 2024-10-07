import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import pic from "./assets/pic.jpeg";
import images from "./assets/images.png";

export default function AppEth() {
  // const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState('0');
  const [currentAccount, setCurrentAccount] = useState('');
  const [error, setError] = useState(null);

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://sepolia.infura.io/v3/4e3461ff9766436abbbad5e8334dc6d2"
    )
  );

  useEffect(() => {
    checkWalletConnected();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getBalance(currentAccount);
    }
  }, [currentAccount]);

  const checkWalletConnected = async () => {
    if (!window.ethereum) {
      setError("MetaMask not detected");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccounts(accounts);
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
      setError("Error checking wallet connection");
    }
  };

  const getBalance = async (address) => {
    try {
      const balanceWei = await web3.eth.getBalance(address);
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
      setBalance(balanceEth);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Error fetching balance");
    }
  };

  const handleConnectMetamask = async () => {
    if (!window.ethereum) {
      setError("MetaMask not detected");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
      console.log("Connected to MetaMask");
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setError("Failed to connect to MetaMask");
      alert("Please allow Metamask connection to this website");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <img src={pic} alt="profile" className="w-20 h-20 rounded-full" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Connect to MetaMask</h1>
        {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
        <div className="flex justify-center mb-4">
          <img src={images} alt="logo" className="h-24 w-24" />
        </div>
        <p className="text-center text-gray-600 mb-6">Ether Account Balance Checker</p>
        <div className="flex justify-center">
          <button
            onClick={handleConnectMetamask}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Connect MetaMask
          </button>
        </div>
        
        {currentAccount && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Connected account:</span> {currentAccount}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Balance:</span> {balance} ETH
            </p>
          </div>
        )}
      </div>
    </div>
  );
}