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
// async function createArtist (req, res) {
//   const artistname = req.body.artistname;
//   await db.createArtist(artistname);
//   res.redirect('/');
// }
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
// async function createType(req, res) {
//   const typename = req.body.typename;
//   const description = req.body.description;
//   await db.createType(typename, description);
//   res.redirect('/')
// }

module.exports = {artistForm, createArtist, typeForm, createType}