import express from "express";
import cors from "cors";
import morgan from "morgan";

import departamentosRoutes from "./routes/departamentos.routes.js";
import empleadosRoutes from "./routes/empleados.routes.js";
import empresaRoutes from "./routes/empresa.routes.js"


const app = express();

app.set("Port", 4000);
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/empleados",empleadosRoutes);
app.use("/departamentos",departamentosRoutes);
app.use("/empresas",empresaRoutes);


app.listen(app.get("Port"), () => {
  console.log("servidor escuchando por el puerto", app.get("Port"));
});