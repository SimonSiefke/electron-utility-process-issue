const { spawn } = require("node:child_process");
const { join } = require("node:path");

const main = async () => {
  const root = join(__dirname, "..");
  for (let i = 0; i < 1000; i++) {
    const child = spawn("npm", ["run", "dev", root]);
    child.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.log("error: missing stdout");
        child.kill();
        process.exit(1);
      }, 4000);
      child.stdout.on("data", (data) => {
        if (data.toString().includes("hello from child")) {
          clearTimeout(timeout);
          child.kill();
          resolve(undefined);
        }
      });
    });
  }
  console.log("issue could not be reproduced");
};

main();
