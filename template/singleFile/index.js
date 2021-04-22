const BaseGenerator = require("../../src/baseGenerator");
const mkdirp = require('mkdirp');

class SingleGenerator extends BaseGenerator {
  constructor() {
    super(__dirname);
    this.existProjectName = false;
    this.answer = {
        projectName:''
    }
  }
  
  async start(){
    await this.createProjectName();
    await this.existDir();
  }

  createDir(){
    this.projectPath = mkdirp.sync(this.answer.projectName)
  }

  writing() { 
    this.writeFiles()
  }

  teses(){
    console.log("this is teses",this.answer.projectName);
  }

}

module.exports = SingleGenerator;
