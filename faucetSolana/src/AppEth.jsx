// //used web3 to connect to metamask


// import React, { useState } from 'react'
// import { connectMetamask, getWeb3 } from 'eth-wallet-connector'

// export default function ConnectComponent() {
//   const [error, setError] = useState(null);
//   const [accounts, setAccounts] = useState([]);

//   const handleConnectMetamask = async () => {
//     try {
//       const result = await connectMetamask();

//       if (result) {
//         const web3 = getWeb3();
//         const connectedAccounts = await web3.eth.getAccounts();
//         setAccounts(connectedAccounts);
//         setError(null);
//       }
//     } catch (err) {
//       console.error('Error connecting to MetaMask:', err);
//       setError(err.message || 'Failed to connect to MetaMask');
//     }
//   }

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

import React from 'react'
import { connectMetamask, getWeb3 } from 'eth-wallet-connector'

export default function ConnectComponent() {
  const [accounts,setAccounts] = React.useState([]);
  const handleConnectMetamask = async () => {
    const result = await connectMetamask();

    if (result) {
      // connected

      const web3 = getWeb3(); // this retrieves the web3 instance from the wallet

      const Connectedaccounts = await web3.eth.getAccounts();
      setAccounts(Connectedaccounts);
    }
  }

 return (
  <div class="flex justify-center items-center bg-gray-100 min-h-screen">
    <div class="flex flex-col items-center justify-center w-auto h-[400px] p-5 bg-white rounded-lg shadow-md space-y-4">
      <button
        onClick={handleConnectMetamask}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
      >
        Connect Metamask
      </button>
      <p class="text-gray-700 font-semibold">Connected Account: <br/> {accounts}</p>
    </div>
  </div>
);

}
