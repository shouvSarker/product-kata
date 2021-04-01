import { Cart, BasePrice } from "./types";

export const cart9363: Cart[] = [
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

export const basePrices: BasePrice[] = [
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
