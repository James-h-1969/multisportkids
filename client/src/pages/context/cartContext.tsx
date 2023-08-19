import { ReactNode, createContext, useContext, useState } from "react";
import {Cart} from "../Components/Cart";
import { useLocalStorage } from "../hooks/useLocalStorage";


type cartProviderProps = {
    children: ReactNode;
}

type CartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    addToCart: (id: number, addingQuantity: number, details:details) => void;
    removeFromCart: (id: number) => void;
    cartItems: CartItem[];
    cartQuantity: number;
}

type details = {
    childName: String,
    childAge: String,
    childComments: String,
    childClub: String,
    purchaseName: String[]
}

type CartItem = {
    id: number;
    quantity: number;
    details: Array<details>
}

const CartContext = createContext({} as CartContext);

export function useCart(){
    return useContext(CartContext);
}

export function CartProvider( {children}:cartProviderProps ){
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
    const [isOpen, setisOpen] = useState(false);

    const openCart = () => setisOpen(true);
    const closeCart = () => setisOpen(false);


    function getItemQuantity(id: number){
        return cartItems?.find(item => item.id === id)?.quantity || 0;
    }

    function addToCart(id: number, addingQuantity: number, details: details) {
        setCartItems((currItems) => {
          if (currItems?.find((item) => item.id === id) == null) {
            // The item is not in the cart already
            return [...currItems, { id, quantity: addingQuantity, details: [details] }]; // Wrap details in an array
          } else {
            return currItems?.map((item) => {
              // The item is in the cart already
              if (item.id === id) {
                const updatedDetails = [...item.details, details]; // Append the new details
                return { ...item, quantity: item.quantity + addingQuantity, details: updatedDetails };
              } else {
                return item;
              }
            });
          }
        });
      }

    function removeFromCart(id: number) {
        setCartItems((currItems) => {
          if (currItems?.find((item) => item.id === id)?.quantity === 1) {
            return currItems.filter((item) => item.id !== id); 
          } else {
            return currItems?.map((item) => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                return item;
              }
            });
          }
        });
    }

    const cartQuantity = cartItems?.reduce((quantity, item) => 
        item.quantity + quantity, 0
    );
    

    return (
        <CartContext.Provider value={{
            getItemQuantity, 
            addToCart, 
            removeFromCart,
            openCart, 
            closeCart,
            cartItems,
            cartQuantity,
             }}>
            {children}
            <Cart isOpen={isOpen}/>
        </CartContext.Provider>
    )
}