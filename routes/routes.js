const express = require('express');
const userConstroller = require('../controller/userController')
const localController = require('../controller/localController')
const thingController = require('../controller/thingController')

router = express()

// user request
router.post('/user', userConstroller.createUser);
router.get('/user/:id', userConstroller.getUser);
router.get('/user', userConstroller.listUser);
router.put('/user/:id', userConstroller.updateUser);
router.delete('/user/:id', userConstroller.deleteUser)

// local request
router.post('/local', localController.createLocal);
router.get('/local/:id', localController.getLocal);
router.get('/local', localController.listLocal);
router.put('/local/:id', localController.updateLocal);
router.delete('/local/:id', localController.deleteLocal)

// thing request
router.post('/thing', thingController.createThing);
router.get('/thing/:id', thingController.getThing);
router.get('/thing', thingController.listThing);
router.put('/thing/:id', thingController.updateThing);
router.delete('/thing/:id', thingController.deleteThing)

module.exports = router;