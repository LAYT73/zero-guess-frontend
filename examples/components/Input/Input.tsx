import "./Input.module.scss";
import React from "react";

interface InputProps {
  children: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Input;
