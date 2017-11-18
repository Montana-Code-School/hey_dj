module.exports = {
  db: process.env.MONGODB_URI || "mongodb://localhost/heydj",
  key: "dumbspotify",
  port: process.env.PORT || 3099
};
