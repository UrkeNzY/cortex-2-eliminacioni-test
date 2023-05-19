import classes from "./MainHeader.module.css";

import { Link } from "react-router-dom";

import Button from "./UI/Button";

const MainHeader = (props) => {
  const toggleCartHandler = () => {
    props.showCart();
  };

  return (
    <header>
      <Link to="/">
        <img
          className={classes.logo}
          src="images/site-logo.svg"
          alt="site logo"
        />
      </Link>
      <Link to="/product/add">
        <Button className={classes.addButton} text="+ Add Product" />
      </Link>
      <img
        onClick={toggleCartHandler}
        className={classes.cart}
        src="images/cart-icon.svg"
        alt="cart icon"
      />
    </header>
  );
};

export default MainHeader;
