import { useState } from "react";
import { ethers } from "ethers";

import "./App.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
// const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  // provider.send("eth_requestAccounts", []);
  // const signer = provider.getSigner();
  const onConnect = () => {
    if (window.ethereum) {
      //якщо є MetaMask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((account) => {
          setUserAccount(account[0]);
          getBalance(account[0]);
        });
    } else {
      alert("встановіть MetaMask");
    }
  };

  const getBalance = async (account) => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const balance = await provider.getBalance(account);
    // const balanceInEth = ethers.utils.formatEther(balance);
    // console.log(balanceInEth);
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [account, "latest"],
      })
      .then((balance) => {
        setBalance(ethers.utils.formatEther(balance, 2));
        console.log(balance);
      });
  };

  return (
    <div className="container">
      <Header
        handleConnect={onConnect}
        userWallet={userAccount}
        balance={balance}
      />
      <Form />
    </div>
  );
}

export default App;
