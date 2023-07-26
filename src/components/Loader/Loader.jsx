import { Dna } from "react-loader-spinner";

const Loader = () => {
  return (
    <Dna
      visible={true}
      height="40"
      width="50"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
};

export default Loader;
