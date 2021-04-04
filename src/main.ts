import {
  BasePrice,
  BasePriceOptions,
  Cart,
  CartOptions,
  ConvertedJsonInput,
} from "./types";
import { convertedJsonInput } from "./utilities/readInputs";

// The first two arguments while running a typescript script are the script runner
// and file name. Hence slice those off and read in the rest of the arguments.
const incomingArguments: ConvertedJsonInput = convertedJsonInput(
  process.argv.slice(2)
);

/**
 * Checks if a base price and cart options match.
 * This will only look for matches if the option already exists in base price.
 * For example, a base price without any options will return true for any cart option.
 *
 * @param priceOptions The options from base price.
 * @param cartOptions The options from the cart.
 * @returns boolean representing whether the options match.
 */
const optionCheck = (
  priceOptions: BasePriceOptions,
  cartOptions: CartOptions
): boolean =>
  Object.keys(cartOptions)
    .map((cartOptionKey) =>
      // If the option key exists in both price and cart, check if they match.
      // Otherwise just return true (skipping check).
      priceOptions[cartOptionKey] && cartOptions[cartOptionKey]
        ? (priceOptions[cartOptionKey] || []).includes(
            cartOptions[cartOptionKey] || "Not Found"
          )
        : true
    )
    // Check if all of the checks pass.
    .reduce((acc, curr) => acc && curr);

/**
 * Gets the lowest base price from a list of base prices.
 *
 * @param suppliedBasePrices A list containing all the matching base prices.
 * @returns The lowest base price cause we are nice to the customers. :wink:
 */
const getLowestBasePrice = (
  suppliedBasePrices: BasePrice[]
): BasePrice | undefined =>
  suppliedBasePrices.sort((basePriceOne, basePriceTwo) =>
    basePriceOne.basePrice > basePriceTwo.basePrice ? 1 : -1
  )[0];

/**
 * Gets the base price for a single cart item.
 *
 * @param cart The single cart object to get base prices for.
 * @param basePrices A list of all available base prices.
 * @returns The lowest base price for the product (expected to have only one
 *          matching base price, but handles if there are multiple available base prices
 *          by getting the lowest base price).
 */
const lowestBasePrice = (
  cart: Cart,
  basePrices: BasePrice[]
): BasePrice | undefined =>
  getLowestBasePrice(
    basePrices.filter(
      (price) =>
        price.productType === cart.productType &&
        optionCheck(price.options, cart.options)
    )
  );

/**
 * Gets total price for cart.
 *
 * @param carts A list of cart items to get total prices for.
 * @param basePrices A list of all available base prices.
 * @returns Total prices for all the items in the cart.
 */
const getTotalPrice = (carts: Cart[], basePrices: BasePrice[]): number =>
  carts
    .map((cart) => {
      const basePriceObject = lowestBasePrice(cart, basePrices);

      // It is expected that there will always be a base price for a cart.
      // In case there isn't, that case is not handled extensively as in the
      // problem statement there isn't a requirement to do.
      // We return 0 in the unlikely case where base price is missing.
      return basePriceObject
        ? (basePriceObject.basePrice +
            Math.round((basePriceObject.basePrice * cart.artistMarkup) / 100)) *
            cart.quantity
        : 0;
    })
    // Add all the prices together.
    .reduce((acc, curr) => acc + curr, 0);

/**
 * Prints total price of given cart items.
 *
 * @param incomingArguments JSON input files consisting carts and base prices.
 */
const showTotalPrice = (incomingArguments: ConvertedJsonInput): void =>
  console.log(
    `Total price for cart ${
      incomingArguments.convertedCart.path
    } and base price ${
      incomingArguments.convertedBasePrice.path
    } is: ${getTotalPrice(
      incomingArguments.convertedCart.items,
      incomingArguments.convertedBasePrice.items
    )}`
  );

// Call main function to show total prices.
showTotalPrice(incomingArguments);
