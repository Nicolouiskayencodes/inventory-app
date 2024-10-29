const db = require('../db/queries')

async function renderInventory(req, res) {
  const inventory = await db.getAll()
  console.log(inventory)
  res.render('index', {artList: inventory})
}
async function renderArtist(req, res) {
  const artist_inventory = await db.getArtist(req.params.id)
  console.log(artist_inventory)
  res.render('artist',{artist_name: artist_inventory[0].artist_name, artList:artist_inventory})
}
async function renderType(req, res) {
  const type_inventory = await db.getType(req.params.id)
  console.log(type_inventory)
  res.render('type', {type_name:type_inventory[0].type_name, type_description:type_inventory[0].description, artList:type_inventory})
}

module.exports = {renderInventory, renderArtist, renderType}