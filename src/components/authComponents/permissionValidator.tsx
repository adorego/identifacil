'use client'

import {useSession} from "next-auth/react";

export default function PermissionValidator(permiso:string, sessionParam:any){
    // const { data: session } : {data:any; } = useSession();
    const session = sessionParam;


    if(session){
        if(session.roles.map((item:any)=>item.nombre).includes('administrador')){

            return true
        }else{
            if(session?.roles){

                const listaPermisos = session?.roles.map((item:any)=>item.permisos.map((permiso:any)=>permiso.nombre)).reduce((acc: string | any[], val: any) => acc.concat(val), [])
                return listaPermisos.includes(permiso)
            }
        }
    }


}