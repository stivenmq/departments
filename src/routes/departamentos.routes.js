import { Router } from "express";
import departamentosCrtl from "../controllers/departamentos.controllers.js";
const route = Router();

route.get("/",departamentosCrtl.ListarDepartamentos);
route.get("/:id",departamentosCrtl.ListarById);
route.post("/",departamentosCrtl.Create);
route.put("/:id",departamentosCrtl.Update);
route.delete("/:id",departamentosCrtl.Delete);
route.get("/use/:id",departamentosCrtl.listaEspecifica)

export default route;