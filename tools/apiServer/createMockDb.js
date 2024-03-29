const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { users, categories } = mockData;
const data = JSON.stringify({
  users,
  categories,
});
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, (err) => {
  err ? console.log(err) : console.log("Mock DB created.");
});
