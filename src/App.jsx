import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const onConnect = async () => {
    setIsLoading(true);
    const provider = await detectEthereumProvider();
    if (!isConnected) {
      if (provider) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((account) => {
            setUserAccount(account[0]);
            getBalance(account[0]);
            setIsLoading(false);
          });
        setIsConnected(true);
        window.ethereum.on("accountChanged", onConnect);
        window.ethereum.on("chainChanged", chainChangedHandler);
      } else {
        toast.error("Please install MetaMask!");
        setIsLoading(false);
      }
    } else {
      setIsConnected(false);
      chainChangedHandler();
    }
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  const getBalance = async (account) => {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });
    const balanceInEth = ethers.utils.formatEther(balance);
    setBalance((+balanceInEth).toFixed(3));
  };

  const handleTransaction = async (transactionInfo) => {
    setIsLoading(true);

    window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: userAccount,
            to: transactionInfo.recipientWallet,
            value: ethers.utils.parseEther(transactionInfo.tokens)._hex,
            gasLimit: "0x5028",
            maxPriorityFeePerGas: "0x3b9aca00",
            maxFeePerGas: "0x2540be400",
          },
        ],
      })
      .then(() => {
        setIsLoading(false);
        toast.success("Transaction is success!");
      })
      .catch(() => {
        setIsLoading(false);

        toast.error("Oops...something went wrong! Try again");
      });
  };

  return (
    <div className="container">
      <Header
        handleConnect={onConnect}
        userWallet={userAccount}
        balance={balance}
        isLoading={isLoading}
      />
      <Form
        onSubmit={handleTransaction}
        isLoading={isLoading}
        isConnected={isConnected}
      />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          success: {
            style: {
              background: "#BEF4C9",
            },
          },
          error: {
            style: {
              background: "#F7D4DD",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
