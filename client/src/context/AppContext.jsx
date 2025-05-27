import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({}); // {itemId1:freq1,itemId2:freq2}
  const [searchQuery, setSearchQuery] = useState([]);

  // fetch seller status
  const fetchSeller = async () => {
    try {
      const res = await axios.get('/api/seller/is-auth');
      const { data } = await res;

      if (data.success) {
        setIsSeller(true);
      }
      else {
        setIsSeller(false);
      }
    } catch (e) {
      setIsSeller(false);
    }
  }

  // fetch user auth status , user data and cart items -> fetch user after refresh also to stay user login
  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/user/is-auth');
      const { data } = await res;
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch (e) {
      setUser(null);
    }
  }

  // fetch all products
  const fetchProducts = async () => {
    try {
      let res = await axios.get('/api/product/list');
      let { data } = await res;
      if (data.success) {
        let { products } = data;
        setProducts(products);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  // add products to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems); // deepcloneing

    if (cartData[itemId]) { // {itemId, freq}
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    toast.success('Added to Cart');
  }

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems); // deepcloneing
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success('Cart Updated');
  }

  // remove item from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success('Removed from Cart');
  }

  // remove the complete item from cart
  const removeFromCartCompletely = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success('Removed from Cart');
  }

  //  get cart item count
  const getCartCount = () => {
    let totalCount = 0;
    for (let item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  }

  // get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (let item in cartItems) {
      let product = products.find((product) => product._id === item);
      // if(product){
      totalAmount += product.offerPrice * cartItems[item];
      // }
    }
    return Math.floor(totalAmount * 100) / 100;
  }

  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, [])

  // update database cart items
  useEffect(() => {
    const updateCart = async () => {
      try {
        const res = await axios.post('/api/cart/update', { cartItems });
        const { data } = await res;
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
    if (user) {
      updateCart();
    }
  }, [cartItems]);

  const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartCount, getCartAmount, removeFromCartCompletely, axios, fetchProducts, setCartItems };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}