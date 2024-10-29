const db = require('../db/queries');

const artistForm = (req, res) => {
  res.render('artistForm')
}
async function createArtist (req, res) {
  const artistname = req.body.artistname;
  await db.createArtist(artistname);
  res.redirect('/');
}
const typeForm = (req, res) => {
  res.render('typeForm')
}
async function createType(req, res) {
  const typename = req.body.typename;
  const description = req.body.description;
  await db.createType(typename, description);
  res.redirect('/')
}

module.exports = {artistForm, createArtist, typeForm, createType}