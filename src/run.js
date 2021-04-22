const config = require("../config");
const inquirer = require("inquirer");
const run = () => {
  inquirer
    .prompt([
      {
        name: "progromName",
        message: "请选择需要创建项目的类型",
        type: "list",
        // choices: map(conf, item => item)
        choices: config
      }
    ])
    .then(answer => {
      //generators 创建生成器
      const Generator = config[answer.progromName].template
      const generator = new Generator()
      generator.run()
    });
};

module.exports = run;
