import { redirect } from "next/navigation";
import { FC } from "react";

interface PageProps{
    ruta:string
}

const Redirect:FC<PageProps> = (params:PageProps)=>{
    redirect(params.ruta)
}
    


export default Redirect;