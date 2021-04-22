const fs = require("fs");
const chalk = require("chalk");
const existFileName = async (path, fileName) => {
  // fs.readdirSync(dir).forEach(file => {
  //     console.log(file);
  //   })
  const dir = await fs.promises.opendir(path);
  let flag = false;
  for await (const dirent of dir) {
    if (dirent.isDirectory() && fileName == dirent.name) {
      flag = true;
    }
  }
  return flag;
};
const warnLog = function(text) {
  console.log(chalk.red.bgWhite.bold(text));
};

module.exports = {
  existFileName,
  warnLog
};
