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
    addToCart: (id: number, addingQuantity: number) => void;
    removeFromCart: (id: number) => void;
    cartItems: CartItem[];
    cartQuantity: number;
}

type CartItem = {
    id: number;
    quantity: number;
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

    function addToCart (id: number, addingQuantity: number){
        setCartItems((currItems) => {
            if (currItems?.find((item) => item.id === id) == null){
                return [...currItems, {id, quantity: addingQuantity}]
            } else {
                return currItems?.map(item => {
                    if(item.id === id){
                       return {...item, quantity: item.quantity + addingQuantity} 
                    } else {
                        return item;
                    }
                })
            }
        })
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