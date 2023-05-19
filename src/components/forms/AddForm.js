import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../UI/Button";
import ItemContext from "../../store/item-context";

const AddForm = () => {
  const itemCtx = useContext(ItemContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    itemCtx.addItem(formData);
    navigate(-1);
  };

  return (
    <React.Fragment>
      <h1>Add a Product</h1>
      <form onSubmit={handleSubmit}>
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
        <Button text="Add Product" type="submit" />
      </form>
    </React.Fragment>
  );
};

export default AddForm;
