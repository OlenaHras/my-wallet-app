import { useState } from "react";
// import { ethers } from "ethers";

import "./App.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
// const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [userAccount, setUserAccount] = useState(null);

  // provider.send("eth_requestAccounts", []);
  // const signer = provider.getSigner();
  const onConnect = () => {
    if (window.ethereum) {
      //якщо є MetaMask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((account) => {
          setUserAccount(account[0]);
          console.log(userAccount);
        });
    } else {
      alert("встановіть MetaMask");
    }
  };

  return (
    <div className="container">
      <Header handleConnect={onConnect} />
      <Form />
    </div>
  );
}

export default App;
