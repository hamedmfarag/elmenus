const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use((req, res, next) => {
  setTimeout(next, 100);
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

// Use default router
server.use(router);

// Start server
const port = 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
