import { readFileSync } from "fs";
import { join } from "path";
import { BasePrice, Cart, ConvertedJsonInput } from "../types";

/**
 * Convert tag names to camel case.
 *
 * @param tagName The string to be converted to camel case.
 * @returns camelCase tag name
 */
const toCamel = (tagName: string) => {
  return tagName.replace(/([-][a-z])/gi, (firstCharacterAfterBreak) => {
    return firstCharacterAfterBreak.toUpperCase().replace("-", "");
  });
};

/**
 * Checks if supplied element is of an array type.
 *
 * @param a Element to check if that's an array.
 * @returns Boolean value representing if it is an array.
 */
const isArray = (a: any) => {
  return Array.isArray(a);
};

/**
 * Checks if supplied element is of an object type.
 *
 * @param o Element to check if that's an object.
 * @returns Boolean value representing if it is an object.
 */
const isObject = (o: any) => {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

/**
 * Converts keys of an object to camel case.
 *
 * @param o Supplied element to be converted to an object with camel cased namings.
 * @returns An object with keys converted to camel case.
 */
const keysToCamel = (o: any) => {
  if (isObject(o)) {
    const n: { [x: string]: string } = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return o;
};

/**
 * Reads in string file inputs and converts them to JSON objects.
 *
 * @param files The input files (one for cart items, one for base prices).
 * @returns Carts and Base prices with their filepaths, converted to their respective types.
 */
export const convertedJsonInput = (files: string[]): ConvertedJsonInput => {
  // Read in default example values if arguments are not supplied.
  const inputFiles = {
    cartFile:
      files[0] ||
      join(__dirname, "../test/resources/examples/carts/cart-4560.json"),
    basePriceFile:
      files[1] ||
      join(__dirname, "../test/resources/examples/basePrices/base-prices.json"),
  };

  const cart: string = readFileSync(inputFiles.cartFile, "utf8");

  const basePrice: string = readFileSync(inputFiles.basePriceFile, "utf8");

  return {
    convertedCart: Object.assign({
      path: inputFiles.cartFile,
      items: keysToCamel(JSON.parse(cart)) as Cart[],
    }),
    convertedBasePrice: Object.assign({
      path: inputFiles.basePriceFile,
      items: keysToCamel(JSON.parse(basePrice)) as BasePrice[],
    }),
  };
};
