import type { CartItem } from "@/interfaces";
import Cookies from "js-cookie";

export class CartCookiesClient {
  static getCart(): CartItem[] {
    return JSON.parse(Cookies.get("cart") || "[]");

  }

  static addItem(item: CartItem): CartItem[] {
    const cart = CartCookiesClient.getCart();

    const existingItem = cart.find((cartItem) => {
      return cartItem.productId === item.productId && cartItem.size === item.size;
    });

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }

    Cookies.set("cart", JSON.stringify(cart));

    return cart;
  }

  static removeItem(productId: string, size: string): CartItem[] {

    const cart = CartCookiesClient.getCart();
    const updatedCard = cart.filter(item => !(item.productId === productId && item.size === size));

    Cookies.set("cart", JSON.stringify(updatedCard));

    return updatedCard;
  }
}