const NODE_ENV = "production";

module.exports = {
  frontend_url:
    NODE_ENV === "production"
      ? "https://admin.sortmycollege.com"
      : "http://localhost:3000/",
  backend_url:
    NODE_ENV === "production"
      ? "https://sortmycollegeapp.com"
      : "http://localhost:9000",
  ZOOM_CLIENT_ID:
    NODE_ENV === "production"
      ? "splqFa5rT6OuIYV0YRTcxg"
      : "splqFa5rT6OuIYV0YRTcxg",
  ZOOM_CLIENT_SECRET:
    NODE_ENV === "production"
      ? "zqn8jZNLogibXPbMk0XjUQll2521jEXl"
      : "zqn8jZNLogibXPbMk0XjUQll2521jEXl",
  REDIRECT_URI:
    NODE_ENV === "production"
      ? "admin.sortmycollege.com"
      : "http://localhost:3000",
};
