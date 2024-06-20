import { Router } from "express";
import empresaCrtl from "../controllers/empresa.controllers.js";
const route = Router();

route.get("/",empresaCrtl.listarEmpresas);
route.get("/:id",empresaCrtl.ListById);
route.post("/",empresaCrtl.Create);
route.put("/:id",empresaCrtl.Update);
route.delete("/:id",empresaCrtl.Delete);
route.get("/use/:id",empresaCrtl.ListaEspecifica)
route.get("/usa/:id",empresaCrtl.ListaEspecificaDeDepartamentos)

export default route;
