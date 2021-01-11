import { Express } from "express";
import arriendos from "./arriendos";
import arriendosDisponibles from "./arriendosDisponibles";
import embarcaciones from "./embarcaciones";
import encuestas from "./encuestas";
import pagos from "./pagos";
import seguros from "./seguros";
import usuarios from "./usuarios";

const rutas = (app: Express) => {
  arriendos(app);
  arriendosDisponibles(app);
  embarcaciones(app);
  encuestas(app);
  pagos(app);
  seguros(app);
  usuarios(app);
};

export default rutas;
