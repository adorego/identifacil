import * as React from "react";
import {signIn, useSession} from "next-auth/react";
import {useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";
import { Toaster, toast } from 'sonner'
import {useRouter} from "next/navigation";


const other_headless = {
    padding: '16px',
    width: '356px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    background: 'hsl(0, 0%, 99%)',
    border: '1px solid hsl(0, 0%, 93%)',
    position: 'relative'
}

export default function SessionWatcher(permisos: Array<String> = [], rol: string = 'administrador'){

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const datos_sesion : any = {...session}
        // Para encontrar si el permiso existe dentro del array
        // @ts-ignore
        // console.log(datos_sesion.roles[0]?.permisos.map((item:any)=> item.nombre).includes('Crear rol'))

        console.log(datos_sesion)
        // console.log(session)
        if (status === 'unauthenticated') {
            signIn();
        }




    }, [status]);



    if (!session) {
        toast.warning('Favor iniciar sesión')
    }

    return(
        <>
            <div className='sonnerContainer'>
                <Toaster position="top-right" closeButton />
            </div>
        </>
    )
}