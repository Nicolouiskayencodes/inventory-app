const pool = require('./pool');

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM art JOIN artists ON artists.id = art.artistid JOIN art_types ON art_types.id = art.typeid")
  return rows;
}

async function getArtist(id) {
  const { rows } = await pool.query(`SELECT * FROM artists JOIN art ON artists.id = art.artistid JOIN art_types ON art_types.id = art.typeid WHERE artists.id = ${id}`)
  return rows;
}

async function getType(id) {
  const {rows} = await pool.query(`SELECT * FROM art_types JOIN art ON art.typeid = art_types.id JOIN artists ON art.artistid = artists.id WHERE art_types.id = ${id}`)
  return rows;
}

async function createArtist(name) {
  await pool.query(`INSERT INTO artists (artist_name) VALUES ('${name}');`)
}

async function createType(name, description) {
  await pool.query(`INSERT INTO art_types (type_name, description) VALUES ('${name}', '${description}');`)
}

async function getAllArtists() {
  const { rows } = await pool.query('SELECT * FROM artists');
  return rows;
}

async function getAllTypes() {
  const { rows } = await pool.query('SELECT * FROM art_types');
  return rows;
}

async function createArt(name, created, price, image, artistid, typeid) {
  let valimage = null;
  let valcreated = null;
  let valprice = null;
  if (image!=='') {
    valimage = image
  }
  if (created !==''){
    valcreated = created
  }
  if (price !==''){
    valprice = price
  }
  await pool.query(`INSERT INTO art (art_name, created, price, image, typeid, artistid) VALUES ('${name}', ${valcreated}, ${valprice}, ${valimage}, '${typeid}', '${artistid}');`)
}

module.exports = {getAll, getArtist, getType, createArtist, createType, getAllArtists, getAllTypes, createArt}