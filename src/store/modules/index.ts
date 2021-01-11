import { ModuleTree } from "vuex";

import { State } from "@/store";

// modules
import usuarios from "./usuarios";
import arriendos from "./arriendos";
import arriendosDisponibles from "./arriendosDisponibles";
import embarcaciones from "./embarcaciones";
import encuestas from "./encuestas";
import pagos from "./pagos";
import seguros from "./seguros";

const modules: ModuleTree<State> = {
  usuarios,
  arriendos,
  arriendosDisponibles,
  embarcaciones,
  encuestas,
  pagos,
  seguros,
};

export default modules;
