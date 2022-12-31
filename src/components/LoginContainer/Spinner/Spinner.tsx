import React from "react";
import { CgSpinner } from "react-icons/cg";
import "./spinner.css";

interface Ispinner {
  message: string;
}

const Spinner = ({ message }: Ispinner) => {
  return (
    <div className="form-spinner">
      <h2 color="red" className="spinner-message">
        {message}
      </h2>
      <div className="spinner-container">
        <CgSpinner size={50} color={"#ec9a9a"} />
      </div>
    </div>
  );
};

export default Spinner;
