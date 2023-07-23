/* eslint-disable react/prop-types */
import "./Header.css";

const Header = ({ handleConnect }) => {
  return (
    <header className="header">
      <a className="logo">
        {/* <img src="" alt="logo" /> */}
        LOGO
      </a>
      <button
        onClick={() => {
          handleConnect();
        }}
      >
        Connect wallet
      </button>
    </header>
  );
};

export default Header;
