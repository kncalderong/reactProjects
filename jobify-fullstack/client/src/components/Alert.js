import React from "react";
import { useAppContext } from "../context/appContext";

const Alert = () => {
  const { alertType, alertText } = useAppContext(); //this access to the values(that usually are states and functions on the global context)
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
