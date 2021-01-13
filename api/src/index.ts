//Libreria epress para crear servidores web
import * as express from "express";
//history api para que funcione correctamente vue
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
app.use(express.json());
//le indica al servidor que la aplicacion cliente se encuentra en la carpeta dist4
const staticFileMiddleware = express.static("dist");
app.use(staticFileMiddleware);

app.use((req, res, next) => {
  if (req.path.includes("api/")) {
    next();
  } else {
    history(req, res, next);
  }
});
app.use(staticFileMiddleware);
// RUTAS

rutas(app);

// LISTENER

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});
