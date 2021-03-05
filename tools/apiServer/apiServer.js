const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use((req, res, next) => {
  setTimeout(next, 200);
});

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const baseUrl = "/api";

// Declaring custom routes below. Add custom routes before JSON Server router
server.use(
  jsonServer.rewriter({
    [`${baseUrl}/menu`]: "/menu",
  })
);

server.post(`${baseUrl}/signin`, (req, res, next) => {
  const menu = router.db.get("menu").value();
  const user = menu.users.find(
    (user) =>
      user.username === req.body.username &&
      user.password === req.body.password &&
      user.role === "admin"
  );

  if (user) {
    res.statusCode = 200;
    res.send({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  } else {
    res.statusCode = 404;
    res.send({});
  }
});

// Use default router
server.use(router);

// Start server
const port = 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
