const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/registration.html", async (req, res) => {
  res.render("auth/registration.ejs", { msg: { messages: [] } });
});

router.post("/registration", async (req, res) => {
  res.render("auth/registration.ejs", {
    msg: await authController.registration(req),
  });
});

router.get("/login.html", async (req, res) => {
  res.render("auth/login.ejs", { msg: [] });
});

router.post("/login", async (req, res) => {
  const login = await authController.login(req, res);
  if (login.code == "SUCCESS") {
    res.redirect("/");
  } else {
    res.render("auth/login.ejs", { msg: login.messages });
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
