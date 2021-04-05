import { showTotalPrice } from "./showTotalPrice";
import { convertedJsonInput } from "./utilities/readInputs";
import { ConvertedJsonInput } from "./types";

// The first two arguments while running a typescript script are the script runner
// and file name. Hence slice those off and read in the rest of the arguments.
const incomingArguments: ConvertedJsonInput = convertedJsonInput(
  process.argv.slice(2)
);

// Call main function to show total prices.
showTotalPrice(incomingArguments);
