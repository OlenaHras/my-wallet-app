import "./Form.css";

const Form = () => {
  return (
    <div className="form-wrapper">
      <form className="form">
        <label htmlFor="wallet">Wallet address</label>
        <input className="form__input" type="text" id="wallet" name="wallet" />
        <label htmlFor="balans">Tokens</label>
        <input className="form__input" type="text" id="balans" name="balans" />
        <button className="form__button" type="submit">
          Click
        </button>
      </form>
    </div>
  );
};

export default Form;
