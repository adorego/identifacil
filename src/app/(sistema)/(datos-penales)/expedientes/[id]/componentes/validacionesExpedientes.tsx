import {useGlobalContext} from "@/app/Context/store";
import {CausaType} from "@/components/utils/penalesType";



const ValidacionesExpedientes = (datosFormularios : any)=>{
    const {openSnackbar} = useGlobalContext();

    console.log(datosFormularios)
    if(!datosFormularios.hechosPuniblesCausas){
        return ('error')
    }



}

export default ValidacionesExpedientes