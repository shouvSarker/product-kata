import { execSync } from "child_process";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { convertedJsonInput } from "../../utilities/readInputs";

const localPathToTest: string = "../resources/examples/carts";

const calculateLoadTime = (inputFilePath: string) => {
  const dynamicBigLoadStart = Date.now();

  convertedJsonInput(["", inputFilePath]);

  return (Date.now() - dynamicBigLoadStart) / 1000;
};

export const createDynamicBigBasePrice = (
  location: string = "../resources/others/basePrices/base-prices-big-dynamic.json"
) => {
  const optionKeys = Array.from({ length: 200 }, () => {
    return `option${Math.random()}`;
  });

  const stringArrayByLength = (size: number) =>
    Array.from({ length: size }, () => {
      return `optionValue${Math.random()}`;
    });

  const optionValues = Array.from({ length: 200 }, () => {
    return stringArrayByLength(20);
  });

  const zipObj = (xs: any) => (ys: any) =>
    xs.reduce((obj: any, x: any, i: any) => ({ ...obj, [x]: ys[i] }), {});

  const options = zipObj(optionKeys)(optionValues);

  const bigBasePrice = Array.from({ length: 2000 }, () => {
    return {
      productType: `type${Math.random()}`,
      basePrice: Math.random(),
      options: options,
    };
  });

  writeFileSync(
    join(__dirname, location),
    JSON.stringify(
      bigBasePrice.concat(convertedJsonInput([]).convertedBasePrice.items)
    )
  );
};

const testOutcomes = (
  basePriceFileWithPath: string,
  localOutcomePath: string,
  fileProcessingTime: number
) =>
  readdirSync(join(__dirname, localPathToTest)).map((file) => {
    const fileWithPath = join(__dirname, localPathToTest, file);

    const start = Date.now();

    const output = execSync(
      `ts-node ./src/main.ts ${fileWithPath} ${basePriceFileWithPath}`
    ).toString();

    const timeTaken = (Date.now() - start) / 1000 - fileProcessingTime;

    const outcome =
      output ===
      readFileSync(
        join(__dirname, `${localOutcomePath}${file.replace("json", "txt")}`),
        "utf8"
      );

    outcome
      ? console.log(`Passed ${localPathToTest}/${file}`)
      : console.error(`Failed ${localPathToTest}/${file}`);

    return { outcome, timeTaken };
  });

export const throwTestFailure = (errorMessage: string) => {
  throw errorMessage;
};

export const runTest = (
  basePriceFileWithPath: string,
  localOutcomePath: string,
  desc: boolean
) => {
  const fileProcessingTime = calculateLoadTime(basePriceFileWithPath);
  const exampleTest = testOutcomes(
    basePriceFileWithPath,
    localOutcomePath,
    fileProcessingTime
  );

  return {
    result: exampleTest.reduce((acc, curr) => acc && curr),
    topOutcome: exampleTest.sort((outcomeOne, outcomeTwo) =>
      outcomeOne.timeTaken > outcomeTwo.timeTaken ? 1 : -1
    )[desc ? 0 : exampleTest.length - 1],
  };
};
