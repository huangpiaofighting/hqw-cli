const config = [
  {
    name: "单输出js项目",
    value:0,
    template:require('../template/singleFile')
  },
  {
    name: "多输出js项目",
    value:1,
    template:require('../template/multiFile')
  },
  {
    name: "服务器项目",
    value:2,
    template:require('../template/serverProject')
  },
  {
    name: "umi单页项目",
    value:3,
    template:require('../template/umiProject')
  },
];
module.exports = config;
