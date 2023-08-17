const express        = require('express');
const route          = express.Router(); // Call router middleware
const userController = require('../controller/userController') // Import the userController.JS

route.get('/api/get_all_users', userController.get_all_users);

route.get('/api/find_user', userController.find_user);

route.post('/api/create_user', userController.create_user);

route.put('/api/update_user', userController.update_user);

route.delete('/api/delete_user', userController.delete_user);

module.exports = route;