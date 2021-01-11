import { ModuleTree } from "vuex";

import { State } from "@/store";

// modules
import usuarios from "./usuarios";

const modules: ModuleTree<State> = {
  usuarios,
};

export default modules;
