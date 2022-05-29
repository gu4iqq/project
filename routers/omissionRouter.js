const router = require("express").Router();
const prepodMiddleware = require("../middlewares/prepodMiddleware");

const authController = require("../controllers/authController");

const groupRepo = require("../resources/groups/group.memory.repository");
const studentRepo = require("../resources/students/student.memory.repository");
const disciplineRepo = require("../resources/disciplines/discipline.memory.repository");
const omissionRepo = require("../resources/omissions/omission.memory.repository");

router.get("/groups.html", async (req, res) => {
  const groups = await groupRepo.getGroups();
  res.render("groups.ejs", { groups: groups });
});

router.get("/choiseDiscipline", async (req, res) => {
  const disciplines = await disciplineRepo.getDisciplines();
  res.render("disciplines.ejs", {
    groupId: req.query.groupId,
    disciplines: disciplines,
    user: await authController.getUserByToken(req),
  });
});

router.get("/omissionsAdd", prepodMiddleware, async (req, res) => {
  res.render("omissions.ejs", {
    group: await groupRepo.getGroup(req.query.groupId),
    discipline: await disciplineRepo.getDiscipline(req.query.disciplineId),
    students: await studentRepo.getStudentsByGroupId(req.query.groupId),
  });
});

router.get("/omissionsList", async (req, res) => {
  res.render("omissionsList.ejs", {
    group: await groupRepo.getGroup(req.query.groupId),
    discipline: await disciplineRepo.getDiscipline(req.query.disciplineId),
    omissions: "",
    errMsg: "",
  });
});

router.post("/omissionsList", prepodMiddleware, async (req, res) => {
  const group = await groupRepo.getGroup(req.body.groupId);
  const discipline = await disciplineRepo.getDiscipline(req.body.disciplineId);
  const omissions = await omissionRepo.getOmissionsByDateDiscGroup(req.body.date, req.body.disciplineId, req.body.groupId);
  let err = null;
  if (omissions[0] == null) {
    err = "Записей не найдено.";
  }
  res.render("omissionsList.ejs", {
    group: group,
    discipline: discipline,
    omissions: omissions,
    errMsg: err,
  });
});

router.get("/omissions", async (req, res) => {
  res.render("omissions.ejs", {
    group: await groupRepo.getGroup(req.query.groupId),
    discipline: await disciplineRepo.getDiscipline(req.query.disciplineId),
    students: await studentRepo.getStudentsByGroupId(req.query.groupId),
  });
});

router.post("/omissionTable", prepodMiddleware, async (req, res) => {
  const students = await studentRepo.getStudentsByGroupId(req.body.groupId);
  for (let i = 0; i < req.body.exist.length; i++) {
    await omissionRepo.createOmission(req.body.date, req.body.disciplineId, students[i].id, req.body.exist[i]);
  }
  res.redirect("/");
});

module.exports = router;
