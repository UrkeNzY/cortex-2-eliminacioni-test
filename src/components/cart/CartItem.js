import { useContext } from "react";

import classes from "./CartItem.module.css";

import ItemContext from "../../store/item-context";

const CartItem = (props) => {
  const cartCtx = useContext(ItemContext);

  const removeCartItemHandler = () => {
    cartCtx.removeCart(props.id);
  };

  return (
    <div className={classes.cartItemContainer}>
      <div className={classes.info}>
        <h2>{props.name}</h2>
        <p>{`${props.description.slice(0, 55)}...`}</p>
      </div>
      <div className={classes.actions}>
        <p>{props.price}€</p>
        <img
          onClick={removeCartItemHandler}
          src="images/trash-can-icon.svg"
          alt="delete icon"
        />
      </div>
    </div>
  );
};

export default CartItem;
