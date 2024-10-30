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
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const artists = await db.getAllArtists();
  const types = await db.getAllTypes();
      return res.status(400).render("artForm", {
        errors: errors.array(), artists: artists, types: types,
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

module.exports = {artistForm, createArtist, typeForm, createType, artForm, createArt, updateForm, updatePiece}