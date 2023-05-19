import { useState, useContext } from "react";

import classes from "./CartModal.module.css";

import Button from "../UI/Button";
import CartItem from "./CartItem";
import ItemContext from "../../store/item-context";

const CartModal = (props) => {
  const [itemBought, setItemBought] = useState(false);
  const cartCtx = useContext(ItemContext);

  const totalPrice = cartCtx.cart.reduce((total, item) => {
    return total + item.price;
  }, 0);

  const purchaseHandler = () => {
    cartCtx.buyCart();
    setItemBought(true);
  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.cartHeader}>
        <div>
          <h2>Shopping cart</h2>
          {cartCtx.cart.length > 0 ? (
            <p>You have {cartCtx.cart.length} item(s) in your cart</p>
          ) : (
            <p>You haven't selected any items.</p>
          )}
        </div>
        <div onClick={props.onClick}>
          <p className={classes.closeButton}>&#215;</p>
        </div>
      </div>
      {cartCtx.cart?.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        );
      })}
      {itemBought && <h1>Thank you for your purchase!</h1>}
      <hr />
      <p className={classes.totalText}>Total: {totalPrice}€</p>
      <Button
        onClick={purchaseHandler}
        className={classes.checkoutButton}
        text="&#62;"
      />
    </div>
  );
};

export default CartModal;
