//used web3 to connect to metamask


// import React, { useState } from 'react'
// import {web3} from 'web3'
// import { connectMetamask, getWeb3 } from 'eth-wallet-connector'
// // import pic from "..\src\assets\pic.jpeg"

// export default function AppEth() {
//   // const [error, setError] = useState(null);
//   // const [accounts, setAccounts] = useState([]);
//   // const [balance, setBalance] = useState(0);

//   const failMessage = "Failed to connect to MetaMask";
//   const successMessage = "Connected to MetaMask";


//   const web3 = new Web3(
//     new Web3.providers.HttpProvider(
//       "https://sepolia.infura.io/v3/4e3461ff9766436abbbad5e8334dc6d2"
//     )
//   );

//   const checkWalletConnected = async ()=>{
//     if(!window.ethereum) return;

//     const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//     console.log(accounts);
//   }
//   // const handleConnectMetamask = async () => {
//   //   try {
//   //     const result = await connectMetamask();

//   //     if (result) {
//   //       const web3 = getWeb3();
//   //       const connectedAccounts = await web3.eth.getAccounts();
//   //       setAccounts(connectedAccounts);
//   //       setError(null);
//   //     }
//   //   } catch (err) {
//   //     console.error('Error connecting to MetaMask:', err);
//   //     setError(err.message || 'Failed to connect to MetaMask');
//   //   }
//   // }

//   return (
//     <div>
//       <button onClick={handleConnectMetamask}>Connect MetaMask</button>
//       {error && <p style={{color: 'red'}}>Error: {error}</p>}
//       {accounts.length > 0 && (
//         <p>Connected accounts: {accounts.join(', ')}</p>
//       )}
//     </div>
//   )
// }


// import React from 'react'
// import { connectMetamask, getWeb3 } from 'eth-wallet-connector'

// export default function ConnectComponent() {
//   const [accounts,setAccounts] = React.useState([]);
//   const handleConnectMetamask = async () => {
//     const result = await connectMetamask();

//     if (result) {
//       // connected

//       const web3 = getWeb3(); // this retrieves the web3 instance from the wallet

//       const Connectedaccounts = await web3.eth.getAccounts();
//       setAccounts(Connectedaccounts);
//     }
//   }

//  return (
//   <div class="flex justify-center items-center bg-gray-100 min-h-screen">
//     <div class="flex flex-col items-center justify-center w-auto h-[400px] p-5 bg-white rounded-lg shadow-md space-y-4">
//       <button
//         onClick={handleConnectMetamask}
//         class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
//       >
//         Connect Metamask
//       </button>
//       <p class="text-gray-700 font-semibold">Connected Account: <br/> {accounts}</p>
//     </div>
//   </div>
// );

// }
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import pic from "./assets/pic.jpeg";
import images from "./assets/images.png";

export default function AppEth() {
  const [accounts, setAccounts] = useState([]);
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