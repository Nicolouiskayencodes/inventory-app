const db = require('../db/queries')

async function renderInventory(req, res) {
  const inventory = await db.getAll()
  console.log(inventory)
  res.send(inventory)
}

module.exports = {renderInventory}