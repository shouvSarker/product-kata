import { BasePrice, Cart } from "./types";
import { BasePrices, Cart4560, Cart9363, Cart9500, Cart11356 } from "./samples";

const optionCheck = (price: BasePrice, cart: Cart) =>
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
    .reduce((acc, curr) => acc && curr);

const getLowestBasePrice = (suppliedBasePrices: BasePrice[]) =>
  suppliedBasePrices.sort((basePriceOne, basePriceTwo) =>
    basePriceOne.basePrice > basePriceTwo.basePrice ? 1 : -1
  )[0];

const lowestBasePrice = (cart: Cart, basePrices: BasePrice[]) =>
  getLowestBasePrice(
    basePrices.filter(
      (price) =>
        price.productType === cart.productType && optionCheck(price, cart)
    )
  );

const showTotalPrices = (cart9363: Cart[], basePrices: BasePrice[]) => {
  const total9363 = cart9363
    .map((cart) => {
      const basePriceObject = lowestBasePrice(cart, basePrices);

      const currBestPriceAmount = basePriceObject
        ? basePriceObject.basePrice
        : undefined;

      return currBestPriceAmount
        ? (currBestPriceAmount +
            Math.round((currBestPriceAmount * cart.artistMarkup) / 100)) *
            cart.quantity
        : 0;
    })
    // Add all the prices together.
    .reduce((acc, curr) => acc + curr, 0);

  console.log(
    `The total price is for cart ${JSON.stringify(
      cart9363
    )} is: ${JSON.stringify(total9363)}\n`
  );
};

showTotalPrices(Cart4560, BasePrices);
showTotalPrices(Cart9363, BasePrices);
showTotalPrices(Cart9500, BasePrices);
showTotalPrices(Cart11356, BasePrices);
