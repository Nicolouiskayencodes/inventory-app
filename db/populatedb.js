const { Client } = require('pg');
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS art_types (
id INT PRIMARY KEY,
type_name VARCHAR NOT NULL,
description VARCHAR NOT NULL
);

INSERT INTO art_types (id, type_name, description)
VALUES
  (
    1,
    'Image',
    'Static image piece'
), 
  (
    2,
    'Video',
    'Moving image with sound'
  );

CREATE TABLE IF NOT EXISTS artists (
  id INT PRIMARY KEY,
  artist_name VARCHAR NOT NULL
);

INSERT INTO artists (id, artist_name)
VALUES
  (
    1,
    'Leonardo DaVinci'
  ),
  (
    2,
    'James Cameron'
  );

  CREATE TABLE IF NOT EXISTS art (
  id INT PRIMARY KEY,
  art_name VARCHAR NOT NULL,
  created DATE,
  price INT,
  image VARCHAR,
  typeid INT,
  artistid INT
  );

  INSERT INTO art (id, art_name, typeid, artistid)
  VALUES (
    1,
    'Mona Lisa',
    1,
    1
  ),
  (
    2,
    'Avatar',
    2,
    2
  );
`
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
