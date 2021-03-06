const jsonServer = require("json-server");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");

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
    [`${baseUrl}/menu`]: "/categories",
  })
);

//  Sign In
server.post(`${baseUrl}/signin`, (req, res, next) => {
  const users = router.db.get("users").value();
  const user = users.find(
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
    res.send({
      code: 102,
      message: "username_password_incorect",
    });
  }
});

// Add new Category
server.post(`${baseUrl}/category`, (req, res, next) => {
  const db = router.db;
  const table = db.get("categories");

  if (!req.body.name || !req.body.description) {
    res.statusCode = 400;
    res.send({
      code: 100,
      message: "fields_required",
    });
  } else {
    const categories = router.db.get("categories").value();
    const isExist = _.findIndex(categories, function (o) {
      return o.name === req.body.name;
    });

    if (isExist !== -1) {
      res.statusCode = 400;
      res.send({
        code: 101,
        message: "already_exist",
      });
    } else {
      const newCategory = { id: uuidv4(), ...req.body, items: [] };
      table.unshift(newCategory).write();
      res.statusCode = 200;
      res.send(newCategory);
    }
  }
});

// Edit Existing Category
server.put(`${baseUrl}/category`, (req, res, next) => {
  const db = router.db;
  const table = db.get("categories");

  if (!req.body.id || !req.body.name || !req.body.description) {
    res.statusCode = 400;
    res.send({
      code: 100,
      message: "fields_required",
    });
  } else {
    const categories = router.db.get("categories").value();
    const categoryIndex = _.findIndex(categories, function (o) {
      return o.id === req.body.id;
    });

    if (categoryIndex === -1) {
      res.statusCode = 400;
      res.send({
        code: 105,
        message: "not_exist",
      });
    } else {
      categories[categoryIndex] = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        items: [...categories[categoryIndex].items],
      };

      table.write();
      res.statusCode = 200;
      res.send(categories[categoryIndex]);
    }
  }
});

// Add new Item to existing Category
server.post(`${baseUrl}/category/item`, (req, res, next) => {
  const db = router.db;
  const table = db.get("categories");

  if (
    !req.body.catId ||
    !req.body.name ||
    !req.body.description ||
    !req.body.price
  ) {
    res.statusCode = 400;
    res.send({
      code: 100,
      message: "fields_required",
    });
  } else {
    const categories = router.db.get("categories").value();
    const catIndex = _.findIndex(categories, function (o) {
      return o.id === req.body.catId;
    });

    if (catIndex !== -1) {
      const newCategoryItem = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      };
      const updatedCategory = {
        ...categories[catIndex],
        items: [...categories[catIndex].items, newCategoryItem],
      };

      categories[catIndex] = updatedCategory;
      table.write();

      res.statusCode = 200;
      res.send(newCategoryItem);
    } else {
      res.statusCode = 400;
      res.send({
        code: 105,
        message: "not_exist",
      });
    }
  }
});

// Use default router
server.use(router);

// Start server
const port = 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
