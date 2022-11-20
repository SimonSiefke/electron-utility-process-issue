const { utilityProcess } = require("electron");

console.log({ utilityProcess });

utilityProcess.fork("./child.js", [], {
  stdio: "inherit",
});
