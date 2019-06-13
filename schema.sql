DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS bookshelves;

CREATE TABLE IF NOT EXISTS bookshelves (
  id SERIAL PRIMARY KEY,
  name VARCHAR(222)
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(222),
  author VARCHAR(222),
  isbn TEXT,
  image_url TEXT,
  description TEXT,
  bookshelf_id INT REFERENCES bookshelves(id)
);
