import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { getItemFromStorage } from "utils/localStorage";
import { useLoggedIn } from "./LoggedInContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LIST_CART_BY_USERID } from "../apollo/queries/cart";
import { CREATE_CART, DELETE_CART } from "../apollo/mutations/cart";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  // const [favoriteCart, setFavoriteCart] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedAllCartItems, setSelectedAllCartItems] = useState(false);
  const [selectCartItem, setSelectCartItem] = useState([]);
  const [isCartRemoved, setIsCartRemoved] = useState(false);
  const { user } = useLoggedIn();

  const [ADD_TO_CART, { loading: addToCartLoading }] = useMutation(
    gql(CREATE_CART)
  );
  const [REMOVE_CART, { loading: removeCartLoading }] = useMutation(
    gql(DELETE_CART)
  );
  const { data, loading: listCartLoading } = useQuery(gql(LIST_CART_BY_USERID), {
    variables: {
      limit: 100,
      nextToken: null,
    },
    skip: !user,
  });

  useEffect(() => {
    const cartData = getItemFromStorage(`cart${user?.sub}`);

    if (Array?.isArray(cartData)) {
      setCartData(cartData);
    } else {
      setCartData([]);
    }
  }, [user?.sub]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        // favoriteCart, setFavoriteCart,
        selected,
        setSelected,
        setSelectCartItem,
        selectCartItem,
        selectedAllCartItems,
        setSelectedAllCartItems,
        isCartRemoved,
        setIsCartRemoved,
        userCartData: data?.listCartByUserId,
        ADD_TO_CART,
        REMOVE_CART,
        addToCartLoading,
        removeCartLoading,
        listCartLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useHorseContext must be used within a HorseProvider");
  }
  return context;
};

export { CartProvider, useCartContext };
