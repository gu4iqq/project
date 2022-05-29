const db = require("../../db");

async function createGroup(group_number) {
  return (await db.query("INSERT INTO groups (group_number) VALUES ($1) RETURNING *;", [group_number])).rows[0];
}

async function getGroups() {
  return (await db.query("select * from groups")).rows;
}

async function getGroup(id) {
  return (await db.query("select * from groups where id = $1", [id])).rows[0];
}

async function updateGroup(id, group_number) {
  return (await db.query("UPDATE groups set group_number = $1 WHERE id = $2 RETURNING *;", [group_number, id])).rows[0];
}

async function deleteGroup(id) {
  return (await db.query("delete from groups where id = $1 RETURNING *", [id])).rows[0];
}

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
};
