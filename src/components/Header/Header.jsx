/* eslint-disable react/prop-types */
import "./Header.css";
import img from "../../assets/wallet.png";
import Loader from "../Loader/Loader";
const Header = ({
  handleConnect,
  userWallet,
  balance,
  isLoading,
  isConnected,
}) => {
  let wallet;
  if (userWallet) {
    wallet = `${userWallet.slice(0, 5)}...${userWallet.slice(-4)}`;
  }

  return (
    <header className="header">
      <a className="logo">
        <img src={img} alt="logo" width="50px" height="50px" />
      </a>
      <button
        className="connect-button"
        onClick={() => {
          handleConnect();
        }}
      >
        {isLoading && !isConnected ? (
          <Loader />
        ) : userWallet && balance ? (
          <div>
            <span style={{ marginRight: "5px" }}>{balance}</span>
            <span>{wallet}</span>
          </div>
        ) : (
          "Connect wallet"
        )}
      </button>
    </header>
  );
};

export default Header;
