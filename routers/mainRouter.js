const router = require("express").Router();
const userRepo = require("../resources/users/user.memory.repository");
const authController = require("../controllers/authController");
const adminMiddleware = require("../middlewares/adminMiddleware");

async function setAdmin(username) {
  const admin = await userRepo.getUserByUsername(username);
  if (admin) {
    await userRepo.updateUser(admin.id, admin.username, admin.password, "ADMIN");
  }
}

router.get(["/", "/index.html"], async (req, res) => {
  setAdmin("Admin");
  const user = await authController.getUserByToken(req);
  res.render("index.ejs", { user: user });
});

router.get("/users.html", adminMiddleware, async (req, res) => {
  res.render("users.ejs", {
    users: await userRepo.getUsers(),
  });
});

router.post("/addUser", async (req, res) => {
  await userRepo.createUser(req.body.username, req.body.password, ["USER"]);
  res.redirect("/users.html");
});

router.post("/deleteUser", adminMiddleware, async (req, res) => {
  await userRepo.deleteUser(req.body.id);
  res.redirect("/users.html");
});

router.get("/authError.html", (req, res) => {
  res.render("authError.ejs");
});

router.get("/changeUserRole", adminMiddleware, async (req, res) => {
  const user = await userRepo.getUser(req.query.userId);
  res.render("changeUserRole.ejs", { user: user });
});

router.post("/changeRole", adminMiddleware, async (req, res) => {
  const user = await userRepo.getUser(req.body.userId);
  await userRepo.updateUser(user.id, user.username, user.password, req.body.role);
  res.redirect("/changeUserRole?userId=" + user.id);
});

module.exports = router;
