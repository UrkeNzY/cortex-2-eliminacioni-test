import React from "react";
import ReactDOM from "react-dom";

import classes from "./Cart.module.css";

import CartModal from "./CartModal";

const Backdrop = ({ onClick }) => {
  return <div onClick={onClick} className={classes.backdrop}></div>;
};

const Cart = ({ showModal, onToggleModal }) => {
  return (
    <div className={classes.cart}>
      {showModal &&
        ReactDOM.createPortal(
          <Backdrop onClick={onToggleModal} />,
          document.getElementById("backdrop")
        )}
      {showModal &&
        ReactDOM.createPortal(
          <CartModal onClick={onToggleModal} checkoutButtonClassName={classes.checkoutButton} />,
          document.getElementById("modals")
        )}
    </div>
  );
};

export default Cart;
