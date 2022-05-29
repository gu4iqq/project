const router = require("express").Router();
const disciplineRepo = require("../resources/disciplines/discipline.memory.repository");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/disciplineEdit", adminMiddleware, async (req, res) => {
  res.render("disciplineEdit.ejs", {
    disciplines: await disciplineRepo.getDisciplines(),
  });
});

router.post("/createDiscipline", adminMiddleware, async (req, res) => {
  await disciplineRepo.createDiscipline(req.body.disciplineName);
  res.render("disciplineEdit.ejs", {
    disciplines: await disciplineRepo.getDisciplines(),
  });
});

router.post("/deleteDiscipline", adminMiddleware, async (req, res) => {
  await disciplineRepo.deleteDiscipline(req.body.disciplineId);
  res.render("disciplineEdit.ejs", {
    disciplines: await disciplineRepo.getDisciplines(),
  });
});

module.exports = router;
