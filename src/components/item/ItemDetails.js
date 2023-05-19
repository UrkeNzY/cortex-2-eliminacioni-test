import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./ItemDetails.module.css";

import Button from "../UI/Button";
import ItemContext from "../../store/item-context";

const ItemDetails = () => {
  const itemCtx = useContext(ItemContext);
  const navigate = useNavigate();
  const params = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${params.productId}`
        );
        const data = await response.json();

        const itemData = {
          id: data.id,
          name: data.title,
          description: data.description,
          discountPercentage: Math.round(data.discountPercentage),
          thumbnail: data.images[0],
          price: data.price,
          brand: data.brand,
          rating: data.rating,
          stock: data.stock,
        };

        setItem(itemData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [params.productId]);

  if (!item) {
    return <p>Loading...</p>;
  }

  const addToCartHandler = () => {
    itemCtx.addCart(item);
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  const itemDeleteHandler = async () => {
    await itemCtx.removeItem(item.id);
    goBackHandler();
  };

  return (
    <div className={classes.detailsContainer}>
      <img
        className={classes.thumbnail}
        src={item.thumbnail}
        alt="item thumbnail"
      />
      <div className={classes.info}>
        <div className={classes.infoTop}>
          <div>
            <h1>{item.name}</h1>
            <p>{item.brand}</p>
          </div>
          <p className={classes.rating}>{item.rating.toFixed(1)} of 5 ★</p>
        </div>
        <p className={classes.description}>{item.description}</p>
        <div className={classes.infoBottom}>
          <h2 className={classes.price}>{item.price}€</h2>
          <p>Stock: {item.stock}</p>
        </div>
      </div>
      <div className={classes.actions}>
        <Button text="Go Back" onClick={goBackHandler} />
        <Button text="Delete Item" onClick={itemDeleteHandler} />
        <Button text="Add to Cart" onClick={addToCartHandler} />
      </div>
    </div>
  );
};

export default ItemDetails;
