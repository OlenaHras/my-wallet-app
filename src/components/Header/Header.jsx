/* eslint-disable react/prop-types */
import "./Header.css";

const Header = ({ handleConnect, userWallet, balance }) => {
  let wallet;
  if (userWallet) {
    wallet = `${userWallet.slice(0, 5)}...${userWallet.slice(-4)}`;
  }

  return (
    <header className="header">
      <a className="logo">
        {/* <img src="" alt="logo" /> */}
        LOGO
      </a>
      <button
        className="connect-button"
        onClick={() => {
          handleConnect();
        }}
      >
        {userWallet ? (
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
