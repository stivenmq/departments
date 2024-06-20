import { departamentos } from "../fakeDb/departamentos.js";
import { empleados } from "../fakeDb/empleados.js";
import { empresa } from "../fakeDb/empresa.js";
import { response } from "../helpers/response.js";
import { v4 as uuidv4 } from "uuid";



const empleadosCrlt = {};

empleadosCrlt.listarEmpleados =(req,res)=>{
    response(res,200,true,empleados,"lista de empleados");
};
empleadosCrlt.ListarById=(req,res) => {
    const {id}= req.params
    const empleadoExist=empleados.find(item=>item._id===id)
    if(!empleadoExist){
        return response(res,404,false,"","empleado no encontrado")
    };
    return response(res,200,true,empleadoExist,"empleado encontrado")
};
empleadosCrlt.Create= (req,res)=>{
    const{correo} =req.body
    const correoExist=empleados.find(item=>item.correo===correo);
    if(correoExist){
        return response(res,409,false,"",`el correo ${correo} ya existe`)
    }
    const newEmpleado={
        _id:uuidv4(),
        ...req.body,
    };
    empleados.push(newEmpleado);
    return response(res,201,true,newEmpleado,"empleado creado")
};

empleadosCrlt.Update=(req,res)=>{
    const {id}= req.params
    const empleadoIndex= empleados.findIndex(item=>item._id===id)
    if(empleadoIndex===-1){
        return response(res,404,false,"","empleado no encontrado")
    };
    empleados[empleadoIndex]={...empleados[empleadoIndex],...req.body};
    return response(res,200,true,empleadoIndex,"Empleado actualizado")
};

empleadosCrlt.Delete=(req,res)=>{
    const {id}= req.params
    const empleadoIndex=empleados.findIndex(item=>item._id===id)
    if(empleadoIndex===-1){
        return response(res,404,false,"","empleado no encontrado")
    };
    const DepartamentoAsociado = departamentos.findIndex(item=>item._id===id)
    if(DepartamentoAsociado===-1){
    return response(res,400,true,"","el departamento no tiene ninguna sociedad con este empleado")

    };
    const empresaAsociada = empresa.findIndex(item=>item._id===id)
        if(empresaAsociada===-1){
            return response(res,400,"","la empresa no tiene ninguna sociedad con este empleado")
        }
    
     empleados.splice(empleadoIndex,1),
     departamentos.splice(DepartamentoAsociado,1),
     empresa.splice(empresaAsociada,1)

     return response(res,200,true,"","los empleados han sido eliminados, y tambien se eliminaran de su empresa y departamento ")
};




export default empleadosCrlt;