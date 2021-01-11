import * as express from "express";
import * as history_api from "connect-history-api-fallback";
import rutas from "./rutas";

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
  } else {
    history(req, res, next);
  }
});

// RUTAS

rutas(app);

// LISTENER

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});
