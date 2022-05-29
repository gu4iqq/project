const db = require("../../db");

async function createUser(username, password, role) {
  return (await db.query("INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *;", [username, password, role])).rows[0];
}

async function getUsers() {
  return (await db.query("select * from users")).rows;
}

async function getUser(id) {
  return (await db.query("select * from users where id = $1", [id])).rows[0];
}

async function getUserByUsername(username) {
  return (await db.query("select * from users where username = $1", [username])).rows[0];
}

async function updateUser(id, username, password, role) {
  return (await db.query("UPDATE users set username = $1, password = $2, role = $3 WHERE id = $4 RETURNING *;", [username, password, role, id])).rows[0];
}

async function deleteUser(id) {
  return (await db.query("delete from users where id = $1 RETURNING *", [id])).rows[0];
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserByUsername,
  updateUser,
  deleteUser,
};
