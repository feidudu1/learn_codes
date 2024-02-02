'use strict';

/** MONGODB **/
/**
 * 这里的yafei是 MONGODB 的用户名，4321 是 MONGODB 的密码，都是在 MONGODB 的users incon里添加设置的
 */
const mongodbUrl = 'mongodb://yafei:4321@localhost:27017/imooc_cli';
const mongodbDbName = 'imooc_cli';

module.exports = {
  mongodbUrl,
  mongodbDbName,
};
