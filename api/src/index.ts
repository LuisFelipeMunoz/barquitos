import * as oracledb from "oracledb";
import * as express from "express";
import * as history_api from "connect-history-api-fallback";

const mypw = "isicaro";

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const result = await connection.execute(
      `SELECT manager_id, department_id, department_name
       FROM departments
       WHERE manager_id = :id`,
      [103]
    );
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();

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
  } else {
    history(req, res, next);
  }
});

app.get("/api/iniciar_sesion", function(req, res) {
  res.send("OK");
});

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});
