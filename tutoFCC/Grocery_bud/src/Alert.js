import React, { useEffect } from "react";

const Alert = (props) => {
  const { type, msg, removeAlert, list } = props;
  //to cleanly remove the alert after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);

    return () => {
      return clearTimeout(timeout);
    };
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
