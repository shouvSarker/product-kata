import { Cart, BasePrice } from "./types";

export const Cart4560: Cart[] = [
  {
    productType: "hoodie",
    options: {
      size: "small",
      colour: "white",
      printLocation: "front",
    },
    artistMarkup: 20,
    quantity: 1,
  },
];

export const Cart9363: Cart[] = [
  {
    productType: "hoodie",
    options: {
      size: "small",
      colour: "dark",
      printLocation: "front",
    },
    artistMarkup: 20,
    quantity: 2,
  },
  {
    productType: "sticker",
    options: {
      size: "small",
    },
    artistMarkup: 10,
    quantity: 1,
  },
];

export const Cart9500: Cart[] = [
  {
    productType: "hoodie",
    options: {
      size: "small",
      colour: "white",
      printLocation: "front",
    },
    artistMarkup: 20,
    quantity: 1,
  },
  {
    productType: "hoodie",
    options: {
      size: "small",
      colour: "dark",
      printLocation: "front",
    },
    artistMarkup: 30,
    quantity: 1,
  },
];

export const Cart11356: Cart[] = [
  {
    productType: "hoodie",
    options: {
      size: "xl",
      colour: "dark",
      printLocation: "back",
    },
    artistMarkup: 30,
    quantity: 2,
  },
];

export const BasePrices: BasePrice[] = [
  {
    productType: "hoodie",
    options: {
      colour: ["white", "dark"],
      size: ["small", "medium"],
    },
    basePrice: 3800,
  },
  {
    productType: "hoodie",
    options: {
      size: ["large"],
      colour: ["white"],
    },
    basePrice: 3848,
  },
  {
    productType: "hoodie",
    options: {
      colour: ["white"],
      size: ["xl", "2xl", "3xl"],
    },
    basePrice: 4108,
  },
  {
    productType: "hoodie",
    options: {
      colour: ["dark"],
      size: ["large"],
    },
    basePrice: 4212,
  },
  {
    productType: "hoodie",
    options: {
      colour: ["dark"],
      size: ["xl", "2xl", "3xl"],
    },
    basePrice: 4368,
  },
  {
    productType: "sticker",
    options: {
      size: ["small"],
    },
    basePrice: 221,
  },
  {
    productType: "sticker",
    options: {
      size: ["medium"],
    },
    basePrice: 583,
  },
  {
    productType: "sticker",
    options: {
      size: ["large"],
    },
    basePrice: 1000,
  },
  {
    productType: "sticker",
    options: {
      size: ["xl"],
    },
    basePrice: 1417,
  },
  {
    productType: "leggings",
    options: {},
    basePrice: 5000,
  },
];
