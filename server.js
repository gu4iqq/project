const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("./resources/users/user.router");
const mainRouter = require("./routers/mainRouter");
const authRouter = require("./routers/authRouter");
const omissionRouter = require("./routers/omissionRouter");
const disciplineRouter = require("./routers/disciplineRouter");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("static"));

app.use("/", mainRouter);
app.use("/", authRouter);
app.use("/", omissionRouter);
app.use("/", disciplineRouter);
app.use("/api", userRouter);

app.listen(PORT);
