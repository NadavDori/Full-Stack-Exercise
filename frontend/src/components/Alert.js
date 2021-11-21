import React, { useEffect } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

// Styles
import "../styles/Alert.css";

function Alert({ msg, removeAlert }) {
  useEffect(() => {
    let timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="alert-msg">
      <p>
        <BiCheckCircle
          style={{
            fontSize: "1.5rem",
            margin: "0.7rem 0.3rem 0.7rem 0.7rem",
            textAlign: "center",
          }}
        />
        {msg}
      </p>
      <IoMdClose
        onClick={() => removeAlert()}
        style={{
          fontWeight: "400",
          fontSize: "1.5rem",
          margin: "0.7rem 1rem 1rem 1.5rem",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default Alert;
