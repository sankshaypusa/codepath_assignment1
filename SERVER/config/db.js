// In db.js
const { Pool } = require("pg");

// The secret connection string you copied earlier
const connectionString =
  "postgresql://postgres:sKbIYsXUJSRYDpnXnORhEJCdfWPDIRDl@junction.proxy.rlwy.net:13671/railway";

const pool = new Pool({
  connectionString,
});

module.exports = pool;

