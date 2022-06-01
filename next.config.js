const path = require("path");

module.exports = {
  images: {
    domains: ["i.scdn.co"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
