const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const pool = new Pool({
  connectionString:
    "postgresql://admin:root@practice-server-db:5432/practice-server-db",
});

const start = async () => {
  const filePath = path.resolve(__dirname, "schema.txt");
  const schema = fs.readFileSync(filePath, "utf8");
  const result = await pool.query(schema);
  console.log(result);
};

start();
