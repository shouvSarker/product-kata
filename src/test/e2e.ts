import { join } from "path";
import {
  runTest,
  createDynamicBigBasePrice,
  throwTestFailure,
} from "./utilities/e2e";

createDynamicBigBasePrice();

const preconfiguredBigBaseFileWithPath = join(
  __dirname,
  "resources/others/basePrices/base-prices-big.json"
);

const dynamicBigBaseFileWithPath = join(
  __dirname,
  "resources/others/basePrices/base-prices-big-dynamic.json"
);

const dynamicBigBaseOutcome = runTest(
  dynamicBigBaseFileWithPath,
  "../resources/others/outcomes/dynameicBigFile/",
  false
);

const preConfiguredBigBaseOutcome = runTest(
  preconfiguredBigBaseFileWithPath,
  "../resources/others/outcomes/",
  false
);

const exampleBasePriceFileWithPathd = join(
  __dirname,
  "resources/examples/basePrices/base-prices.json"
);

const exampleBasePriceOutcome = runTest(
  exampleBasePriceFileWithPathd,
  "../resources/examples/outcomes/",
  true
);

const timeTakeyByExampleOutcome = exampleBasePriceOutcome.topOutcome
  ? exampleBasePriceOutcome.topOutcome.timeTaken
  : throwTestFailure("Failed to get time taken by example outcome.");

const timeTakenByPreconfiguredOutcome = preConfiguredBigBaseOutcome.topOutcome
  ? preConfiguredBigBaseOutcome.topOutcome.timeTaken
  : throwTestFailure("Failed to get time taken by preconfigured outcome.");

const timeTakenByDynamicOutcome = dynamicBigBaseOutcome.topOutcome
  ? dynamicBigBaseOutcome.topOutcome.timeTaken
  : throwTestFailure("Failed to get time taken by dynamic outcome.");

const timeDiffPreconfig =
  timeTakenByPreconfiguredOutcome - timeTakeyByExampleOutcome > 0.5
    ? {
        failed: true,
        message:
          "Slowest preconfigured big base price file takes 0.5 seconds more to load than slowest example base price file.",
      }
    : {
        failed: false,
        message:
          "Passed! Reasonable time taken (<= 0.5s difference) for preconfigured big file compared to example small file.",
      };

const timeDiffDynamic =
  timeTakenByDynamicOutcome - timeTakeyByExampleOutcome > 0.5
    ? {
        failed: true,
        message:
          "Slowest dynamic big base price file takes 0.5 seconds more to load than slowest example base price file.",
      }
    : {
        failed: false,
        message:
          "Passed! Reasonable time taken (<= 0.5s difference) for dynamic big file compared to example small file.",
      };

timeDiffPreconfig.failed
  ? console.error(timeDiffPreconfig.message)
  : console.log(timeDiffPreconfig.message);

timeDiffDynamic.failed
  ? console.error(timeDiffDynamic.message)
  : console.log(timeDiffDynamic.message);

exampleBasePriceOutcome.result &&
preConfiguredBigBaseOutcome.result &&
dynamicBigBaseOutcome.result &&
(timeDiffPreconfig || timeDiffDynamic.failed)
  ? console.log("All tests have passed!")
  : throwTestFailure("Some tests have failed! Check error logs for details.");
