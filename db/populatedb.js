const { Client } = require('pg');
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS art_types (
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
type_name VARCHAR NOT NULL,
description VARCHAR NOT NULL
);

INSERT INTO art_types (type_name, description)
VALUES
  (
    'Image',
    'Static image piece'
), 
  (
    'Video',
    'Moving image with sound'
  );

CREATE TABLE IF NOT EXISTS artists (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  artist_name VARCHAR NOT NULL
);

INSERT INTO artists (artist_name)
VALUES
  (
    'Leonardo DaVinci'
  ),
  (
    'James Cameron'
  );

  CREATE TABLE IF NOT EXISTS art (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  art_name VARCHAR NOT NULL,
  created DATE,
  price INT,
  image VARCHAR,
  typeid INT,
  artistid INT
  );

  INSERT INTO art (art_name, typeid, artistid)
  VALUES (
    'Mona Lisa',
    1,
    1
  ),
  (
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
