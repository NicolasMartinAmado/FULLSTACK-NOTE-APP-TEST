const {UserDao} = require('../dao/factory');
const UserRepository = require('./user.repository');

const userService = new UserRepository(new UserDao());


console.log(UserDao);

module.exports = {
  userService
};