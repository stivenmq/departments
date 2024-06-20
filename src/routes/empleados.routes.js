import { Router } from "express";
import empleadosCrlt from "../controllers/empleados.controllers.js";
const route = Router()

route.get("/",empleadosCrlt.listarEmpleados);
route.get("/:id",empleadosCrlt.ListarById);
route.post("/",empleadosCrlt.Create);
route.put("/:id",empleadosCrlt.Update);
route.delete("/:id",empleadosCrlt.Delete)

export default route;