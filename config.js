const NODE_ENV = "development";

module.exports = {
  frontend_url:
    NODE_ENV === "production"
      ? "https://counsellor.sortmycollege.com"
      : "https://localhost:9000/counsellor",
  backend_url:
    NODE_ENV === "production"
      ? "https://server.sortmycollege.com"
      : "http://localhost:9000",
};
