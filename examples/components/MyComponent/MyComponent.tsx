import "./MyComponent.module.scss";
import React from "react";

interface MyComponentProps {
  children: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default MyComponent;
