"use strict";

const dbConfig = {
  database: process.env.DB_NAME || "demo",
  url: process.env.MONGODB_URL || "mongodb://localhost"
};

export default dbConfig;
