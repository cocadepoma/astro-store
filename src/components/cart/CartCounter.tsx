import { itemsInCart } from "@/store";
import { CartCookiesClient } from "@/utils";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

const icon = <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" viewBox="0 0 512 512"><circle cx={176} cy={416} r={16} fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32}></circle><circle cx={400} cy={416} r={16} fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32}></circle><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M48 80h64l48 272h256"></path><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M160 288h249.44a8 8 0 0 0 7.85-6.43l28.8-144a8 8 0 0 0-7.85-9.57H128"></path></svg>;

export const CartCounter = () => {
  const $itemsInCart = useStore(itemsInCart);

  useEffect(() => {
    const cart = CartCookiesClient.getCart();
    itemsInCart.set(cart.length);
  }, []);


  return (
    <a href="/cart" className="relative inline-block">
      {
        $itemsInCart > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex justify-center items-center bg-blue-600 text-white tex-xs rounded-full w-5 h-5">
            {$itemsInCart}
          </span>
        )
      }
      {icon}
    </a>
  )
}
