const db = require('../db/queries');
const { body, validationResult } = require("express-validator");
const alphaErr = 'must contain only letters.'
const lengthErr = 'must be between 1 and 30 characters.'

const validateArtist = [
  body('artistname').trim()
    .isAlpha('en-US', {ignore: '\s'}).withMessage(`Artist name ${alphaErr}`)
    .isLength({min: 1, max: 30}).withMessage(`Artist name ${lengthErr}`)
]

const validateType = [
  body('typename').trim()
    .isAlpha('en-US', {ignore: '\s'}).withMessage(`Type name ${alphaErr}`)
    .isLength({min: 1, max: 30}).withMessage(`Type name ${lengthErr}`),
  body('description').trim()
    .optional({ values: "falsy" })
    .isString().withMessage(`Description must be letters, numbers, and punctuation.`)
]
const validateArt = [
  body('name').trim()
    .isAlpha('en-US', {ignore: '\s'}).withMessage(`Name ${alphaErr}`)
    .isLength({min: 1, max: 30}).withMessage(`Name ${lengthErr}`),
  body('created').trim()
    .optional({values: 'falsy'})
    .isDate().withMessage('Date created must be in date format'),
  body('price').trim()
    .optional({values: 'falsy'})
    .isNumeric({min: 0}).withMessage('Price must contain only positive numbers'),
  body('image').trim()
    .optional({values: 'falsy'})
]

const validatePassword = [
  body('password').isString().matches(process.env.PASSWORD).withMessage('Password did not match')
]

const artistForm = (req, res) => {
  res.render('artistForm')
}
const createArtist = [
  validateArtist,
  async function (req, res) {
    const artistname = req.body.artistname;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("artistForm", {
        errors: errors.array(),
      });
    }
    await db.createArtist(artistname);
    res.redirect('/');
  }
]
const typeForm = (req, res) => {
  res.render('typeForm')
}

const createType = [
  validateType,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("typeForm", {
        errors: errors.array(),
      });
    }
    const typename = req.body.typename;
    const description = req.body.description;
    await db.createType(typename, description);
    res.redirect('/')
  }
]

async function artForm(req, res) {
  const artists = await db.getAllArtists();
  const types = await db.getAllTypes();
  console.log(artists, types)
  res.render('artForm', {artists: artists, types: types})
}

const createArt = [
  validateArt,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const artists = await db.getAllArtists();
  const types = await db.getAllTypes();
      return res.status(400).render("artForm", {
        errors: errors.array(), artists: artists, types: types,
      });
    }
  const name = req.body.name;
  const created = req.body.created;
  const price = req.body.price;
  const image = req.body.image;
  const artistid = req.body.artistid;
  const typeid = req.body.typeid;
  await db.createArt(name, created, price, image, artistid, typeid);
  res.redirect('/');
  }
]

async function updateForm(req, res) {
  const art_piece = await db.getArt(req.params.id)
  const artists = await db.getAllArtists();
  const types = await db.getAllTypes();
  console.log(art_piece)
  res.render('updateForm', {piece:art_piece[0], artists: artists, types: types})
}

const updatePiece = [
  validateArt,
  validatePassword,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const art_piece = await db.getArt(req.params.id)
      const artists = await db.getAllArtists();
  const types = await db.getAllTypes();
      return res.status(400).render("updateForm", {
        errors: errors.array(), artists: artists, types: types, piece:art_piece[0]
      });
    }
  const art_id = req.params.id;
  const name = req.body.name;
  const created = req.body.created;
  const price = req.body.price;
  const image = req.body.image;
  const artistid = req.body.artistid;
  const typeid = req.body.typeid;
  await db.updateArt(art_id, name, created, price, image, artistid, typeid);
  res.redirect('/');
  }
]

async function openArt(req, res) {
  const art_piece = await db.getArt(req.params.id)
  res.render('open', {piece: art_piece[0]})
}

async function deleteConfirm(req, res) {
  const art_piece = await db.getArt(req.params.id)
  res.render('delete', {piece: art_piece[0]})
}

const deleteArt = [
  validatePassword,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const art_piece = await db.getArt(req.params.id)
      return res.status(400).render("delete", {
        errors: errors.array(), piece: art_piece[0]
      });
    }
    await db.deleteArt(req.params.id)
    res.redirect('/')
  }
]

async function deleteArtistConfirm(req, res) {
  const artist = await db.getArtist(req.params.id)
  const copyID = req.params.id;
  res.render('deleteartist', {artist: artist[0], id: copyID})
}

async function deleteTypeConfirm(req, res) {
  const type = await db.getType(req.params.id)
  const copyID = req.params.id;
  res.render('deletetype', {type: type[0], id: copyID})
}

const deleteArtist = [
  validatePassword,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const artist = await db.getArtist(req.params.id)
      return res.status(400).render("deleteartist", {
        errors: errors.array(), artist: artist[0], id: req.params.id
      });
    }
    await db.deleteArtist(req.params.id)
    res.redirect('/')
  }
]

const deleteType = [
  validatePassword,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const type = await db.getType(req.params.id)
      return res.status(400).render("deletetype", {
        errors: errors.array(), type: type[0], id: req.params.id
      });
    }
    await db.deleteType(req.params.id)
    res.redirect('/')
  }
]


module.exports = {artistForm, createArtist, typeForm, createType, artForm, createArt, updateForm, updatePiece, openArt, deleteConfirm, deleteArt, deleteArtistConfirm, deleteTypeConfirm, deleteArtist, deleteType}