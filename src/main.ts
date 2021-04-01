import { BasePrice, Cart } from "./types";
import { convertedJsonInput } from "./utilities/readInputs";

const incomingArguments = convertedJsonInput(process.argv.slice(2));

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

const getTotalPrices = (cart9363: Cart[], basePrices: BasePrice[]) => {
  return (
    cart9363
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
      .reduce((acc, curr) => acc + curr, 0)
  );
};

const showTotalPrices = (incomingArguments: any) =>
  console.log(
    `Total price for cart ${
      incomingArguments.convertedCart.path
    } and base price ${
      incomingArguments.convertedBasePrice.path
    } is: ${getTotalPrices(
      incomingArguments.convertedCart.items,
      incomingArguments.convertedBasePrice.items
    )}`
  );

showTotalPrices(incomingArguments);
