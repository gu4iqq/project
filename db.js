const Pool = require("pg").Pool;

var pool;

try {
  if (process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else {
    pool = new Pool({
      connectionString: "postgres://postgres:1111@localhost:5432/postgres",
    });
  }
} catch (error) {
  console.log("Ошибка при подключении к базе данных.");
}

pool.query(
  `
  CREATE TABLE IF NOT EXISTS users
  (
      id serial,
      username varchar(40) UNIQUE NOT NULL,
      password text NOT NULL,
      role text
  );

  CREATE TABLE IF NOT EXISTS groups
  (
      id serial PRIMARY KEY,
      group_number varchar(40)
  );

  CREATE TABLE IF NOT EXISTS students
  (
      id serial PRIMARY KEY,
      studentName varchar(40),
      groupId INTEGER,
      FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS disciplines
  (
      id serial PRIMARY KEY,
      disciplineName varchar(40)
  );

  CREATE TABLE IF NOT EXISTS omissions
  (
      id serial,
      data date,
      disciplineId INTEGER,
      studentId INTEGER,
      isPresent bool,
      FOREIGN KEY (disciplineId) REFERENCES disciplines (id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES students (id) ON DELETE CASCADE
  );
`,
  (err, res) => {
    if (err) {
      console.log(err);
    }
    pool.end;
  }
);

module.exports = pool;
