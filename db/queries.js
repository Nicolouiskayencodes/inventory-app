const pool = require('./pool');

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM art JOIN artists ON artists.id = art.artistid JOIN art_types ON art_types.id = art.typeid")
  return rows;
}

module.exports = {getAll}