const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')
const formController = require('../controllers/formController')

router.get('/', indexController.renderInventory);
router.get('/artist/:id', indexController.renderArtist);
router.get('/type/:id', indexController.renderType);
router.get('/newArtist', formController.artistForm);
router.post('/newArtist', formController.createArtist);
router.get('/newType', formController.typeForm);
router.post('/newType', formController.createType);
router.get('/newArt', formController.artForm);
router.post('/newArt', formController.createArt);

module.exports = router;