const program = require("commander");
const chalk = require("chalk");

class Program {
  constructor(props) {
    this.version = props.version;
    this.setVersion();
  }
  setVersion() {
    program.version(this.version, "-v, --version");
  }
  setOtherProgram() {
    program.option("-t, --test", "output test");
  }
  doOption() {
    const options = program.opts();
    if (options.test) {
      console.log("这是一条测试入口");
      process.exit(0);
    }
  }
  run() {
    program.parse(process.argv);
  }
}

const start = function(props) {
  const programObj = new Program(props);
  programObj.setOtherProgram();
  programObj.run();
  programObj.doOption();
};

module.exports = {
  start
};
