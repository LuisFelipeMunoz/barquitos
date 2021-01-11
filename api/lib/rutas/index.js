"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arriendos_1 = require("./arriendos");
const arriendosDisponibles_1 = require("./arriendosDisponibles");
const embarcaciones_1 = require("./embarcaciones");
const encuestas_1 = require("./encuestas");
const pagos_1 = require("./pagos");
const seguros_1 = require("./seguros");
const usuarios_1 = require("./usuarios");
const rutas = (app) => {
    arriendos_1.default(app);
    arriendosDisponibles_1.default(app);
    embarcaciones_1.default(app);
    encuestas_1.default(app);
    pagos_1.default(app);
    seguros_1.default(app);
    usuarios_1.default(app);
};
exports.default = rutas;
//# sourceMappingURL=index.js.map