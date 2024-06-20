import { departamentos } from "../fakeDb/departamentos.js";
import { empleados } from "../fakeDb/empleados.js";
import { empresa } from "../fakeDb/empresa.js";
import { response } from "../helpers/response.js";
import { v4 as uuidv4 } from "uuid";

const empresaCrtl={};

empresaCrtl.listarEmpresas=(req,res)=>{
    response(res,200,true,empresa,"lista de empresas");
};
empresaCrtl.ListById=(req,res) =>{
    const {id}= req.params
    const empresaExist = empresa.find(item=>item._id===id)
    if(!empresaExist){
        return response(res,404,false,"","La empresa no existe");
    };
    
    return response(res,200,true,empresaExist,"empresa encontrada")

};
empresaCrtl.Create=(req,res)=>{
    const {url}=req.body
    const UrlExist= empresa.find(item=>item.url===url);
    if(UrlExist){
        return response(res,409,false,"",`la Url ${url} ya existe en otra empresa`)
    };

    const {correo}=req.body
    const correoExist = empresa.find(item=>item.correo===correo);
    if(correoExist){
        return response(res,404,false,"",`el correo ${correo} ya existe en otra empresa`)
    };
    const newEmpresa={
        _id:uuidv4(),
        ...req.body,
    };
    empresa.push(newEmpresa);
    return response(res,201,true,newEmpresa,"empresa creada")
};

empresaCrtl.Update=(req,res)=>{
    const{id}=req.params
    const EmpresaIndex=empresa.findIndex(item=>item._id===id)
    if(EmpresaIndex===-1){
        return response(res,404,false,"","la empresa no existe");
    };

    empresa[EmpresaIndex]={...empresa[EmpresaIndex],...req.body};
    return response(res,200,true,EmpresaIndex,"empresa actualizada")

};
empresaCrtl.Delete=(req,res)=>{
    const{id}=req.params
    const EmpresaIndex = empresa.findIndex(item=>item._id===id)
    if(EmpresaIndex===-1){
        return response(res,404,false,"","empresa no encontrada")
    };
    const DepartamentoAsociado = departamentos.findIndex(item=>item._id===id)
    if(DepartamentoAsociado===-1){
    return response(res,400,true,"","esta empresa no tiene ninguna sociedad con este empleado")

    };
    const empleadoAsociado = empleados.findIndex(item=>item._id===id)
    if(empleadoAsociado===-1){
        return response(res,400,false,"","esta empresa no tiene ninguna sociedad con empleados")
    };
    empresa.splice(EmpresaIndex,1),
    departamentos.splice(DepartamentoAsociado,1),
    empleados.splice(empleadoAsociado,1)

    return response(res,200,true,"","empresa eliminada ademas de sus empleados y departamentos")


};
empresaCrtl.ListaEspecifica=(req,res)=>{
    const {id}=req.params
    const datosEmpleado = empleados.find(item=>item._id===id)
    if(!datosEmpleado){
        return response(res,404,false,"este empleado no existe en esta empresa")
    };
    return response(res,200,true,datosEmpleado,"estos son los datos del empleado que pertenece a la empresa")
};
empresaCrtl.ListaEspecificaDeDepartamentos=(req,res)=>{
    const {id}=req.params
    const datosDepartamento = departamentos.find(item=>item._id===id)
    if(!datosDepartamento){
        return response(res,404,false,"este departamento no existe en esta empresa")
    };
    return response(res,200,true,datosDepartamento,"estos son los datos del departamento que pertenece a la empresa")
};

export default empresaCrtl;
