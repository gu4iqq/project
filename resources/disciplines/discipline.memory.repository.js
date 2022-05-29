const db = require("../../db");

async function createDiscipline(disciplineName) {
  return (await db.query("INSERT INTO disciplines (disciplineName) VALUES ($1) RETURNING *;", [disciplineName])).rows[0];
}

async function getDisciplines() {
  return (await db.query("select * from disciplines")).rows;
}

async function getDiscipline(id) {
  return (await db.query("select * from disciplines where id = $1", [id])).rows[0];
}

async function updateDiscipline(id, disciplineName) {
  return (await db.query("UPDATE disciplines set disciplineName = $1 WHERE id = $2 RETURNING *;", [disciplineName, id])).rows[0];
}

async function deleteDiscipline(id) {
  return (await db.query("delete from disciplines where id = $1 RETURNING *", [id])).rows[0];
}

module.exports = {
  createDiscipline,
  getDisciplines,
  getDiscipline,
  updateDiscipline,
  deleteDiscipline,
};
