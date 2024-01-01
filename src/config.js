const NODE_ENV = "development";

module.exports = {
  frontend_url:
    NODE_ENV === "production"
      ? "https://admin.sortmycollege.com"
      : "http://localhost:3000/",
  backend_url:
    NODE_ENV === "production"
      ? "https://server.sortmycollege.com"
      : "http://localhost:9000",
};
