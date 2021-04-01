import { Cart } from "./types";
import { basePrices, cart9363 } from "./samples";

console.log(`sample cart is: ${JSON.stringify(cart9363)}`);
console.log(`sample base price is: ${JSON.stringify(basePrices)}`);

const lowestBasePrice = (cart: Cart) =>
  basePrices
    .filter(
      (price) =>
        price.productType === cart.productType &&
        Object.keys(cart.options)
          .map((cartOptionKey) =>
            // If the option key exists in both price and cart, check if they match.
            // Otherwise just return true (skipping check).
            price.options[cartOptionKey] && cart.options[cartOptionKey]
              ? (price.options[cartOptionKey] || []).includes(
                  cart.options[cartOptionKey] || "Not Found"
                )
              : true
          )
          // Check if all of the check passes.
          .reduce((acc, curr) => acc && curr)
    )
    .sort((basePriceOne, basePriceTwo) =>
      basePriceOne.basePrice > basePriceTwo.basePrice ? 1 : -1
    )[0];

const total9363 = cart9363
  .map((cart) => {
    const basePriceObject = lowestBasePrice(cart);

    const currBestPrice = basePriceObject
      ? basePriceObject.basePrice
      : undefined;

    const total = currBestPrice
      ? (currBestPrice +
          Math.round((currBestPrice * cart.artistMarkup) / 100)) *
        cart.quantity
      : 0;

    console.log(total);
    return total;
  })
  // Add all the prices together.
  .reduce((acc, curr) => acc + curr, 0);

console.log(`\nThe total price is: ${JSON.stringify(total9363)}`);
