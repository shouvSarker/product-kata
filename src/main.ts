import { Cart } from "./types";
import { basePrices, cart9363 } from "./samples";

console.log(`sample cart is: ${JSON.stringify(cart9363)}`);
console.log(`sample base price is: ${JSON.stringify(basePrices)}`);

const lowestBasePrice = (cart: Cart) =>
  basePrices
    .filter(
      (price) =>
        cart &&
        price.productType === cart.productType &&
        Object.keys(cart.options)
          .map(
            (cartOptionKey) =>
              price.options[cartOptionKey] &&
              //@ts-ignore
              price.options[cartOptionKey].includes(
                //@ts-ignore
                cart.options[cartOptionKey] || "Not"
              )
          )
          .reduce((acc, curr) => acc && curr)
    )
    .sort((basePriceOne, basePriceTwo) =>
      basePriceOne.basePrice > basePriceTwo.basePrice ? 1 : -1
    )[0];

const total9363 = cart9363
  .map((cart) => {
    const basePriceObject = lowestBasePrice(cart);
    console.log(JSON.stringify(cart));
    console.log(JSON.stringify(basePriceObject));
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
  .reduce((acc, curr) => acc + curr, 0);

console.log(`\nThe chosen ones are: ${JSON.stringify(total9363)}`);
