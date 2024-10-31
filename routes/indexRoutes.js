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
router.get('/update/:id', formController.updateForm)
router.post('/update/:id', formController.updatePiece)
router.get('/open/:id', formController.openArt)
router.get('/delete/:id', formController.deleteConfirm)
router.post('/delete/:id', formController.deleteArt)
router.get('/deleteartist/:id', formController.deleteArtistConfirm)
router.post('/deleteartist/:id', formController.deleteArtist)
router.get('/deletetype/:id', formController.deleteTypeConfirm)
router.post('/deletetype/:id', formController.deleteType)


module.exports = router;