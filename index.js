import express from "express";
import bodyParser from "body-parser";
import usersRouter from "./src/routes/users.js";
import profilesRouter from "./src/routes/profiles.js";
import postsRouter from "./src/routes/posts.js";
import tutorialsRouter from "./src/routes/tutorials.js";
import routerRoles from "./src/routes/roles.js";

const app = express();

app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/profiles", profilesRouter);
app.use("/posts", postsRouter);
app.use("/tutorials", tutorialsRouter);
app.use("/roles", routerRoles);
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.listen(3000, () => {
  console.log("API server running on http://localhost:3000");
});
