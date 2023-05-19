import { createContext, useReducer, useCallback } from "react";

const ItemContext = createContext({
  items: [],
  cart: [],
  getItems: () => {},
  removeItem: () => {},
  addItem: () => {},
  updateItem: () => {},
  addCart: () => {},
  removeCart: () => {},
  buyCart: () => {},
});

export default ItemContext;

const initialItemsState = {
  items: [],
};

const itemReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        items: action.payload,
      };
    case "REMOVE":
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        items: updatedItems,
      };
    case "ADD":
      const newItem = action.payload;
      return {
        ...state,
        items: [...state.items, newItem],
      };
    case "UPDATE":
      const updatedProduct = action.payload;
      const updatedProducts = state.items.map((product) => {
        if (product.id === updatedProduct.id) {
          return {
            ...product,
            ...updatedProduct,
          };
        }
        return product;
      });
      return {
        ...state,
        items: updatedProducts,
      };
    default:
      return state;
  }
};

const initialCartState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD":
      const isItemInCart = state.cartItems.some(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (!isItemInCart) {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      } else {
        return state;
      }
    case "CART_REMOVE":
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case "CART_PURCHASE":
      const purchasedCart = [];
      return {
        ...state,
        cartItems: purchasedCart,
      };
    default:
      return state;
  }
};

export const ItemContextProvider = (props) => {
  const [itemState, itemDispatch] = useReducer(itemReducer, initialItemsState);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const fetchProductsHandler = useCallback(async (fetchUrl) => {
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();

      let updatedProducts = [];

      updatedProducts = [];
      for (let i = 0; i < data.products.length; i++) {
        const product = data.products[i];
        updatedProducts.push({
          id: product.id,
          name: product.title,
          description: product.description,
          discountPercentage: Math.round(product.discountPercentage),
          thumbnail: product.images[0],
          price: product.price,
        });
      }

      itemDispatch({ type: "SET_PRODUCTS", payload: updatedProducts });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const updateProductHandler = useCallback(
    async (productId, updatedData) => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`,
          {
            method: "PUT", // or PATCH
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          }
        );
        const data = await response.json();

        console.log(data);

        const updatedProduct = {
          id: productId,
          name: updatedData.title,
          description: updatedData.description,
          price: updatedData.price,
        };

        itemDispatch({ type: "UPDATE", payload: updatedProduct });
      } catch (error) {
        console.error("Update error:", error);
      }
    },
    [itemDispatch]
  );

  const removeItemHandler = (id) => {
    itemDispatch({ type: "REMOVE", payload: id });
    console.log(id);
  };

  const addItemHandler = async (newData) => {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    const data = await response.json();

    console.log(data);

    const newProduct = {
      id: Math.random(),
      name: newData.name,
      description: newData.description,
      price: newData.price,
    };

    itemDispatch({ type: "ADD", payload: newProduct });
  };

  const addCartHandler = (item) => {
    cartDispatch({ type: "CART_ADD", payload: item });
  };

  const removeCartHandler = (id) => {
    cartDispatch({ type: "CART_REMOVE", payload: id });
    console.log(id);
  };

  const buyCartHandler = () => {
    cartDispatch({ type: "CART_PURCHASE" });
  };

  return (
    <ItemContext.Provider
      value={{
        items: itemState.items,
        cart: cartState.cartItems,
        getItems: fetchProductsHandler,
        removeItem: removeItemHandler,
        addItem: addItemHandler,
        updateItem: updateProductHandler,
        addCart: addCartHandler,
        removeCart: removeCartHandler,
        buyCart: buyCartHandler,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};
