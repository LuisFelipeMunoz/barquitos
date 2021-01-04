"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const history_api = require("connect-history-api-fallback");
const history = history_api({
    disableDotRule: true,
    verbose: true,
});
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
app.get("/api/iniciar_sesion", function (req, res) {
    res.send("OK");
});
app.listen(port, () => {
    console.log(`Example app listening at port:${port}`);
});
//# sourceMappingURL=index.js.map