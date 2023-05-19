import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./ItemCard.module.css";

import ItemContext from "../../store/item-context";

const ItemCard = (props) => {
  const itemCtx = useContext(ItemContext);

  const updateCartHandler = () => {
    itemCtx.addCart({
      name: props.name,
      description: props.description,
      price: props.price,
      id: props.id,
    });
  };

  return (
    <div className={classes.itemContainer}>
      <img
        className={classes.productImage}
        src={props.thumbnail}
        alt="placeholder item"
      />
      <div className={classes.itemInfo}>
        <h2 className={classes.itemName}>{props.name}</h2>
        <p className={classes.itemDescription}>{props.description}</p>
        <p className={classes.itemDiscount}>-{props.discount}%</p>
        <div className={classes.cardBottom}>
          <p>{props.price}€</p>
          <div className={classes.itemActions}>
            <Link className={classes.Link} to={`product/${props.id}`}>
              <img
                src="images/details.svg"
                alt="details icon"
              />
            </Link>
            <Link className={classes.Link} to={`product/edit/${props.id}`}>
              <img src="images/edit-icon.svg" alt="item edit icon" />
            </Link>
            <img
              onClick={updateCartHandler}
              src="images/item-cart-icon.svg"
              alt="item cart icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
