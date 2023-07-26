import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
// const provider = new ethers.providers.Web3Provider(window.ethereum);
const provider = detectEthereumProvider();

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const onConnect = async () => {
    if (!isConnected) {
      if (provider) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((account) => {
            setUserAccount(account[0]);
            getBalance(account[0]);
          });
        setIsConnected(true);
        window.ethereum.on("accountChanged", onConnect);
        window.ethereum.on("chainChanged", chainChangedHandler);
      } else {
        toast.custom(<div>Please connect to MetaMask.</div>);
      }
    } else {
      setIsConnected(false);
      window.location.reload();
    }
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  const getBalance = async (account) => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
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
        // console.log(txHash);
      })
      .catch(() => {
        setIsLoading(false);

        toast.error("Oops...something went wrong! Try again");
      });
    // try {
    //   setIsLoading(true);
    //   const transaction = await wallet.sendTransaction({
    //     to: transactionInfo.recipientWallet,
    //     value: ethers.utils.parseEther(transactionInfo.tokens),
    //   });
    //   await transaction.wait();
    //   setIsLoading(false);
    //   getBalance(userAccount);
    //   toast.success("Transaction is success!");
    //   console.log(transaction);
    // } catch (error) {
    //   setIsLoading(false);
    //   toast.error("Oops...something went wrong! Try again");
    // }
  };

  return (
    <div className="container">
      <Header
        handleConnect={onConnect}
        userWallet={userAccount}
        balance={balance}
        // isConnected={isConnected}
      />
      <Form
        onSubmit={handleTransaction}
        isLoading={isLoading}
        isConnected={isConnected}
      />
      <Toaster />
    </div>
  );
}

export default App;
