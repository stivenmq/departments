
import { departamentos } from "../fakeDb/departamentos.js";
import { empleados } from "../fakeDb/empleados.js";
import { empresa } from "../fakeDb/empresa.js";
import { response} from "../helpers/response.js";
import { v4 as uuidv4 } from "uuid";



const departamentosCrtl = {};


departamentosCrtl.ListarDepartamentos = (req,res)=>{
    response(res,200,true,departamentos,"lista de departamentos");
};

departamentosCrtl.ListarById = (req,res)=>{
    const {id}= req.params
    const departamentoExist = departamentos.find(item=>item._id===id)
    if(!departamentoExist) {
        return response(res,404,false,"","Departamento no encontrado");
    }
    return response(res,200,true,departamentoExist,"Departamento encontrado");
};

departamentosCrtl.Create =(req,res)=>{
    const newDepartamento={
        _id:uuidv4(),
        ...req.body
    };
    departamentos.push(newDepartamento);

    return response(res,201,true,newDepartamento,"Departamento creado");

};departamentosCrtl.Update=(req,res)=>{
    const {id} = req.params
    const DepartamentoIndex = departamentos.findIndex(item=>item._id===id)
    if(DepartamentoIndex===-1){
        return response(res,404,true,"","Departamento no encontrado");
    };
    departamentos[DepartamentoIndex]={...departamentos[DepartamentoIndex],...req.body}
    return response(res,200,true,departamentos[DepartamentoIndex],"Departamento Actualizado")
};

departamentosCrtl.Delete=(req,res)=>{
    const {id} = req.params
    const departamentoIndex= departamentos.findIndex(item=>item._id===id)
    if(departamentoIndex===-1){
        return response(res,404,false,"","Departamento no encontrado")
    };
    
    const empleadoAsociado = empleados.findIndex(item=>item._id===id)
    if(empleadoAsociado===-1){
        return response(res,400,false,"","este departamento no tiene ninguna sociedad con empleados")
    };
    const empresaAsociada = empresa.findIndex(item=>item._id===id)
    if(empleadoAsociado===-1){
        return response(res,400,false,"","esta empresa no tiene ninguna sociedad con departamentos")
    };




    departamentos.splice(departamentoIndex,1),
    empleados.splice(empleadoAsociado,1),
    empresa.splice(empresaAsociada,1)
    
    return response(res,200,true,"","el Departamento ha sido eliminado y ademas se eliminara el empleado y su empresa");

};
departamentosCrtl.listaEspecifica=(req,res)=>{
    const {id}=req.params
    const datosEmpleado = empleados.find(item=>item._id===id)
    if(!datosEmpleado){
        return response(res,404,false,""," este empleado no tiene ninguna informacion")
    };
    
    return response(res,200,true,datosEmpleado,"estos son los datos del empleado que pertenece al departamento")
}

export default departamentosCrtl;

