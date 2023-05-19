import React, { useEffect, useState, useContext, Fragment } from "react";

import classes from "./ItemsList.module.css";

import Button from "../UI/Button";
import ItemCard from "./ItemCard";
import ItemContext from "../../store/item-context";
import FilterContext from "../../store/filter-context";

const ItemsList = (props) => {
  const [shownItemsNumber, setShownItemsNumber] = useState(9);
  const itemCtx = useContext(ItemContext);
  const filterCtx = useContext(FilterContext);

  let filter = filterCtx.filteredValue;
  const { items, getItems } = itemCtx;

  useEffect(() => {
    getItems(
      filter
        ? `https://dummyjson.com/products/category/${filter}`
        : "https://dummyjson.com/products"
    );
  }, [filter, getItems]);

  const showMoreItemsHandler = () => {
    setShownItemsNumber((prevState) => prevState + 9);
  };

  let content = items.slice(0, shownItemsNumber).map((product) => {
    return (
      <ItemCard
        className={classes.listItem}
        key={product.id}
        id={product.id}
        name={product.name}
        description={product.description}
        discount={product.discountPercentage}
        thumbnail={product.thumbnail}
        price={product.price}
      />
    );
  });

  return (
    <Fragment>
      {items.length === 0 && (
        <p className={classes.infoMessage}>No products available.</p>
      )}
      <div className={classes.listContainer}>{items.length > 0 && content}</div>
      {shownItemsNumber < items.length && (
        <Button className={classes.moreButton} onClick={showMoreItemsHandler} text="Show more" />
      )}
    </Fragment>
  );
};

export default ItemsList;
