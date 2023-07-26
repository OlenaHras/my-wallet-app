import { useState } from "react";

import "./Form.css";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";

// eslint-disable-next-line react/prop-types
const Form = ({ onSubmit, isLoading, isConnected }) => {
  const [recipientWallet, setRecipientWallet] = useState("");
  const [tokens, setTokens] = useState("");

  const addressValidation = (recipientWallet) => {
    const regexp = /^0x[0-9A-F]{40}$/i;
    return regexp.test(recipientWallet);
  };

  const handleChanges = (e) => {
    if (e.target.id === "wallet") {
      setRecipientWallet(e.target.value);
    } else {
      setTokens(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await addressValidation(recipientWallet);
    if (isValid) {
      onSubmit({ recipientWallet, tokens });
      setRecipientWallet("");
      setTokens("");
      return;
    }
    toast.error("Wallet address is not correct");
  };
  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="wallet">Wallet address</label>
        <input
          className="form__input"
          onChange={handleChanges}
          type="text"
          id="wallet"
          value={recipientWallet}
          name="recipientWallet"
          autoComplete="false"
        />
        <label htmlFor="tokens">Tokens</label>
        <input
          className="form__input"
          onChange={handleChanges}
          type="text"
          id="tokens"
          value={tokens}
          name="tokens"
          autoComplete="false"
        />
        <button className="form__button" type="submit" disabled={!isConnected}>
          {isConnected && isLoading ? <Loader /> : <p>Send</p>}
        </button>
      </form>
    </div>
  );
};

export default Form;
