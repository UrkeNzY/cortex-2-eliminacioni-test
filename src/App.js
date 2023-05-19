import { useState, Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Cart from "./components/cart/Cart";
import MainHeader from "./components/MainHeader";
import CategoryFilter from "./components/CategoryFilter";
import ItemsList from "./components/item/ItemsList";
import ItemDetails from "./components/item/ItemDetails";
import UpdateForm from "./components/forms/UpdateForm";
import AddForm from "./components/forms/AddForm";

function App() {
  const [showModal, setShowModal] = useState(false);

  const toggleModalHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Cart showModal={showModal} onToggleModal={toggleModalHandler} />
      <MainHeader showCart={toggleModalHandler} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategoryFilter />
                <ItemsList />
              </>
            }
          />
          <Route path="/product/:productId" element={<ItemDetails />} />
          <Route path="/product/edit/:productId" element={<UpdateForm />} />
          <Route path="/product/add" element={<AddForm />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
