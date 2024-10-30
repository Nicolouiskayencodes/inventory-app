const pool = require('./pool');

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM art JOIN artists ON art.artistid = artists.artistid JOIN art_types ON art.typeid = art_types.typeid")
  return rows;
}

async function getArtist(id) {
  const { rows } = await pool.query(`SELECT * FROM artists JOIN art ON artists.artistid = art.artistid JOIN art_types ON art_types.typeid = art.typeid WHERE artists.artistid = ${id}`)
  return rows;
}

async function getType(id) {
  const {rows} = await pool.query(`SELECT * FROM art_types JOIN art ON art.typeid = art_types.typeid JOIN artists ON art.artistid = artists.artistid WHERE art_types.typeid = ${id}`)
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
    valcreated = `'${created}'`
  }
  if (price !==''){
    valprice = price
  }
  await pool.query(`INSERT INTO art (art_name, created, price, image, typeid, artistid) VALUES ('${name}', ${valcreated}, ${valprice}, ${valimage}, '${typeid}', '${artistid}');`)
}

async function getArt(id) {
  const {rows} = await pool.query(`SELECT * FROM art JOIN artists ON artists.artistid = art.artistid JOIN art_types ON art_types.typeid = art.typeid WHERE art.art_id = ${id};`);
  return rows;
}

async function updateArt(art_id, name, created, price, image, artistid, typeid) {
  let valimage = null;
  let valcreated = null;
  let valprice = null;
  if (image!=='') {
    valimage = image
  }
  if (created !==''){
    valcreated = `'${created}'`
  }
  if (price !==''){
    valprice = price
  }
  await pool.query(`UPDATE art SET art_name = '${name}', created = ${valcreated}, price = ${valprice}, image = ${valimage}, artistid = '${artistid}', typeid = '${typeid}' WHERE art_id = ${art_id}`)
}

module.exports = {getAll, getArtist, getType, createArtist, createType, getAllArtists, getAllTypes, createArt, getArt, updateArt}