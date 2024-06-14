'use client'

import {useSession} from "next-auth/react";

export default function PermissionValidator(permiso: string, sessionParam?: any) {

    let sessionData = sessionParam;


        if (sessionData) {
            if (sessionData.roles.map((item: any) => item.nombre).includes('administrador')) {

                return true
            } else {
                if (sessionData?.roles) {

                    const listaPermisos = sessionData?.roles.map((item: any) => item.permisos.map((permiso: any) => permiso.nombre)).reduce((acc: string | any[], val: any) => acc.concat(val), [])
                    return listaPermisos.includes(permiso)
                }
            }
        }


}