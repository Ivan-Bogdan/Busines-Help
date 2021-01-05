import React from "react";

const Modal = ({ isShowing, children }) => {
  if (!isShowing) return null;

  return <div>{children}</div>;
};
export default Modal;