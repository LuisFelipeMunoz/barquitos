"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const history_api = require("connect-history-api-fallback");
const rutas_1 = require("./rutas");
// HISTORY API CONFIG
const history = history_api({
    disableDotRule: true,
    verbose: true,
});
// APP API CONFIG
const app = express();
const port = 8000;
const staticFileMiddleware = express.static("dist");
app.use(staticFileMiddleware);
app.use((req, res, next) => {
    if (req.path.includes("api/")) {
        next();
    }
    else {
        history(req, res, next);
    }
});
// RUTAS
rutas_1.default(app);
// LISTENER
app.listen(port, () => {
    console.log(`Example app listening at port:${port}`);
});
//# sourceMappingURL=index.js.map