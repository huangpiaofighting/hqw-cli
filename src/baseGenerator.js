const Generator = require("yeoman-generator");
const yeoman = require("yeoman-environment");
const { statSync } = require("fs");
const glob = require("glob");
const path = require("path");
const { existFileName, warnLog } = require("../util/util");

class BaseGenerator extends Generator {
  constructor(rootpath) {
    const cwd = path.join(process.cwd());
    const env = yeoman.createEnv([], { cwd });
    super({ env, resolved: require.resolve(rootpath) });
  }

  async createProjectName() {
    this.answer = await this.prompt([
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名称",
        default: "myapp" // Default to current folder name
      }
    ]);
  }
  async existDir() {
    const cwd = process.cwd();
    const projectName = this.answer.projectName;
    console.log("cwd", cwd);
    this.existProjectName = await existFileName(cwd, projectName);
    if (this.existProjectName) {
      warnLog("该名称在当前目录已存在，请重新输入");
      await this.createProjectName();
      await this.existDir();
    }
  }

  writeFiles() {
    glob
      .sync("**/*", {
        cwd: this.templatePath(),
        dot: true
      })
      .forEach(file => {
        const filePath = this.templatePath(file);
        if (statSync(filePath).isFile()) {
          this.fs.copyTpl(
            this.templatePath(filePath),
            this.destinationPath(`${this.answer.projectName}/${file}`)
          );
        }
      });
  }
}

module.exports = BaseGenerator;
