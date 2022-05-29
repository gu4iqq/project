const db = require("../../db");

async function createOmission(data, disciplineId, studentId, isPresent) {
  return (
    await db.query("INSERT INTO omissions (data, disciplineId, studentId, isPresent) VALUES ($1, $2, $3, $4) RETURNING *;", [
      data,
      disciplineId,
      studentId,
      isPresent,
    ])
  ).rows[0];
}

async function getOmissions() {
  return (await db.query("select * from omissions")).rows;
}

async function getOmissionsByDateDiscGroup(data, disciplineId, groupId) {
  return (
    await db.query(
      "select studentName, isPresent from omissions,groups,students where omissions.data = $1 and omissions.disciplineId =$2 and omissions.studentId = students.id and students.groupId = $3",
      [data, disciplineId, groupId]
    )
  ).rows;
}

async function getOmission(id) {
  return (await db.query("select * from omissions where id = $1", [id])).rows[0];
}

async function updateOmission(id, data, disciplineId, studentId) {
  return (await db.query("UPDATE omissions set data = $1, disciplineId = $2, studentId = $3 WHERE id = $4 RETURNING *;", [data, disciplineId, studentId, id]))
    .rows[0];
}

async function deleteOmission(id) {
  return (await db.query("delete from omissions where id = $1 RETURNING *", [id])).rows[0];
}

module.exports = {
  createOmission,
  getOmissions,
  getOmissionsByDateDiscGroup,
  getOmission,
  updateOmission,
  deleteOmission,
};
