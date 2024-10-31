const { Client } = require('pg');
require('dotenv').config()

const SQL = `
DROP TABLE art;
DROP TABLE artists;
DROP TABLE art_types;

CREATE TABLE IF NOT EXISTS art_types (
typeid INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
type_name VARCHAR NOT NULL,
description VARCHAR NOT NULL
);

INSERT INTO art_types (type_name, description)
VALUES
  (
    'Painting',
    'Paint on some form of canvas.'
), 
  (
    'Video',
    'Moving image with sound'
  );

CREATE TABLE IF NOT EXISTS artists (
  artistid INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
  art_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  art_name VARCHAR NOT NULL,
  created DATE,
  price INT,
  image VARCHAR,
  typeid INT,
  artistid INT
  );

  INSERT INTO art (art_name, created, price, image, typeid, artistid)
  VALUES (
    'Mona Lisa',
    '1503-01-01T00:00:00',
    2000000,
    'https://images.unsplash.com/photo-1559177612-15e1d7e4b0c3?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    1,
    1
  ),
  (
    'Avatar',
    '2009-12-18T00:00:00',
    10,
    'https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg?region=0%2C0%2C800%2C1200',
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
