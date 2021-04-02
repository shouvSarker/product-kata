import { execSync } from "child_process";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
const localPathToTest: string = "resources/examples/carts";

const testOutcomes = readdirSync(join(__dirname, localPathToTest)).map(
  (file) => {
    const fileWithPath = join(__dirname, localPathToTest, file);
    const output = execSync(`ts-node ./src/main.ts ${fileWithPath}`).toString();

    const testOutcome =
      output ===
      readFileSync(
        join(
          __dirname,
          `resources/examples/outcomes/${file.replace("json", "txt")}`
        ),
        "utf8"
      );

    testOutcome
      ? console.log(`Passed ${localPathToTest}/${file}`)
      : console.error(`Failed ${localPathToTest}/${file}`);
    return testOutcome;
  }
);

const throwTestFailure = () => {
  throw "There are test failures! Check error logs for more details";
};

testOutcomes.find((outcome) => outcome === false)
  ? throwTestFailure()
  : console.log("Hurrah! All tests passed successfully");
