// types are readonly to ensure immutability.
// readonly type does not propagate through nested objects, so
// they are explicitly stated.

export type CartOptions = { readonly [key: string]: string };
export type BasePriceOptions = { readonly [key: string]: string[] };

// Cart items type, derived from schema.
export type Cart = {
  readonly productType: string;
  readonly options: CartOptions;
  readonly artistMarkup: number;
  readonly quantity: number;
};

// Base Price items type, derived from schema.
export type BasePrice = {
  readonly productType: string;
  readonly options: BasePriceOptions;
  readonly basePrice: number;
};

// Cart and Base Price, converted to JSON with their file path.
export type ConvertedJsonInput = {
  readonly convertedCart: {
    path: string;
    items: Cart[];
  };
  readonly convertedBasePrice: {
    path: string;
    items: BasePrice[];
  };
};
