const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "react": path.join(path.resolve(__dirname, "../node_modules/react"))
        }
    }
}
