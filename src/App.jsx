// import { useState } from "react";
import { ethers } from "ethers";

import "./App.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  // const [count, setCount] = useState(0);

  // provider.send("eth_requestAccounts", []);
  // const signer = provider.getSigner();
  console.log(provider);
  return (
    <div className="container">
      <Header />
      <Form />
    </div>
  );
}

export default App;
