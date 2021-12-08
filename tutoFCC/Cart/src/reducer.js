const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] }; ///!!!!!!!!always spread the state first, to do not remove other states
  }
  if (action.type === "REMOVE") {
    const id = action.payload;
    const newCart = state.cart.filter((item) => item.id !== id);
    return { ...state, cart: newCart };
  }
  if (action.type === "INCREASE" || action.type === "DECREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return action.type === "INCREASE"
          ? { ...cartItem, amount: cartItem.amount + 1 }
          : { ...cartItem, amount: cartItem.amount - 1 };
      } else {
        return cartItem;
      }
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === "GET_TOTALS") {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const partialPrice = price * amount;
        cartTotal.amount += amount;
        cartTotal.total += partialPrice;

        return cartTotal;
      },
      { total: 0, amount: 0 }
    );

    total = parseFloat(total.toFixed(2));
    return { ...state, amount, total };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  throw new Error("no matching actio type");
};

export default reducer;
