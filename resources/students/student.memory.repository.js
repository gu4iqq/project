const db = require("../../db");

async function createStudent(studentName, groupId) {
  return (await db.query("INSERT INTO students (studentName, groupId) VALUES ($1, $2) RETURNING *;", [studentName, groupId])).rows[0];
}

async function getStudents() {
  return (await db.query("select * from students")).rows;
}

async function getStudent(id) {
  return (await db.query("select * from students where id = $1", [id])).rows[0];
}

async function getStudentsByGroupId(groupId) {
  return (await db.query("select * from students where groupId = $1", [groupId])).rows;
}

async function updateStudent(id, studentName, groupId) {
  return (await db.query("UPDATE students set studentName = $1, groupId = $2 WHERE id = $3 RETURNING *;", [studentName, groupId, id])).rows[0];
}

async function deleteStudent(id) {
  return (await db.query("delete from students where id = $1 RETURNING *", [id])).rows[0];
}

module.exports = {
  createStudent,
  getStudents,
  getStudentsByGroupId,
  getStudent,
  updateStudent,
  deleteStudent,
};
