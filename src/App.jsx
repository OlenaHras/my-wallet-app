import { useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
const provider = new ethers.providers.Web3Provider(window.ethereum);

// const recipientWallet = "0xAabA029A660294173690968c293aa8d7D0718759";

// const PRIVATE_KEY =
//   "6baad5bfa24f6449f935728ba84780489c1fdd2feb983f1c657d1e54bb5ae6a8";
// const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const onConnect = async () => {
    if (!isConnected) {
      if (window.ethereum) {
        //якщо є MetaMask
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
    const balance = await provider.getBalance(account);
    const balanceInEth = ethers.utils.formatEther(balance);
    setBalance((+balanceInEth).toFixed(3));
  };

  const handleTransaction = async (transactionInfo) => {
    setIsLoading(true);
    console.log(ethers.utils.parseEther(transactionInfo.tokens));
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
      .then((txHash) => {
        setIsLoading(false);
        toast.success("Transaction is success!");
        console.log(txHash);
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
