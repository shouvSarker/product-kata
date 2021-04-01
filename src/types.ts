export type CartOptions = { readonly [key: string]: string };
export type BasePriceOptions = { readonly [key: string]: string[] };

/**
 * //TODO:
 * Explain that readonly does not propagate here.
 * Add comments explaining types
 */
export type Cart = {
  readonly productType: string;
  readonly options: CartOptions;
  readonly artistMarkup: number;
  readonly quantity: number;
};

//TODO: comments
export type BasePrice = {
  readonly productType: string;
  readonly options: BasePriceOptions;
  readonly basePrice: number;
};
