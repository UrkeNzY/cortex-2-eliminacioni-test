import { useState, useEffect, useContext, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import classes from "./UpdateForm.module.css";

import Button from "../UI/Button";
import ItemContext from "../../store/item-context";

const UpdateForm = () => {
  const itemCtx = useContext(ItemContext);
  const params = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${params.productId}`
        );
        const data = await response.json();

        const itemData = {
          name: data.title,
        };

        setItem(itemData);
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [params.productId]);

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    itemCtx.updateItem(params.productId, formData);
    navigate(-1);
  };

  return (
    <Fragment>
      {item && <h1>Edit "{item.name}"</h1>}
      <form className={classes} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Product Name..."
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Product Description..."
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Product Price..."
          value={formData.price}
          onChange={handleChange}
        />
        <Button text="Confirm" type="submit" />
      </form>
    </Fragment>
  );
};

export default UpdateForm;
