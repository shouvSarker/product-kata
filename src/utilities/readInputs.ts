import { readFileSync } from "fs";
import { join } from "path";

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const isArray = (a: any) => {
  return Array.isArray(a);
};

const isObject = (o: any) => {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

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

export const convertedJsonInput = (files: string[]) => {
  // first two arguments are ts-node and the source file
  // hence read the next two, which should be cartFile and basePriceFile
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
    convertedCart: Object.assign(
      { items: keysToCamel(JSON.parse(cart)) },
      { path: inputFiles.cartFile }
    ),
    convertedBasePrice: Object.assign(
      { items: keysToCamel(JSON.parse(basePrice)) },
      { path: inputFiles.basePriceFile }
    ),
  };
};
