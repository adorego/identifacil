'use client'


import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import { Toaster, toast } from 'sonner'
import {useRouter, usePathname} from "next/navigation";
import {useGlobalContext} from "@/app/Context/store";


const other_headless = {
    padding: '16px',
    width: '356px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    background: 'hsl(0, 0%, 99%)',
    border: '1px solid hsl(0, 0%, 93%)',
    position: 'relative'
}

const pageMapping = [
    {
        nombre: 'Inicio',
        url: '/inicio',
        permission: 'ver_inicio',
    },
    {
        nombre: 'PPL',
        url: '/ppl',
        permission: 'ver_ppl',
    },
    {
        nombre: 'Registro PPL',
        url: '/inicio/registro/ppl',
        permission: 'registrar_ppl',
    },
    {
        nombre: 'Entrada/Salida PPL',
        url: '/acceso/entrada-salida-ppl',
        permission: 'entrada_salida_ppl',
    },
    {
        nombre: 'Registro Visitante',
        url: '/inicio/registro/visitante',
        permission: 'registro_visitante',
    },
    {
        nombre: 'Entrada/Salida Visitante',
        url: '/acceso/entrada-salida-visitante',
        permission: 'entrada_salida_visitante',
    },
    {
        nombre: 'Lista de Visitas',
        url: '/acceso/lista-visitas',
        permission: 'lista_visitas',
    },
    {
        nombre: 'Medidas de Fuerza',
        url: '/gestion-ppl/medidas-de-fuerza',
        permission: 'ver_medidas_de_fuerza',
    },
    {
        nombre: 'Expedientes',
        url: '/expedientes',
        permission: 'ver_expedientes',
    },
    {
        nombre: 'Traslados',
        url: '/movimientos/traslados',
        permission: 'ver_traslados',
    },
    {
        nombre: 'Informers',
        url: '/informes',
        permission: 'ver_informers',
    },
    {
        nombre: 'Ver medidas de seguridad',
        url: '/medidas-seguridad',
        permission: 'ver_medidas_de_seguridad',
    },
    {
        nombre: 'Ver motivos de traslados',
        url: '/sistema/motivos-traslados',
        permission: 'ver_motivos_de_traslados',
    },
    {
        nombre: 'Ver Custodiso',
        url: '/sistema/personal',
        permission: 'ver_custodios',
    },
    {
        nombre: 'Ver Vehiculos',
        url: '/sistema/vehiculo',
        permission: 'ver_vehiculo',
    },
    {
        nombre: 'Ver choferes',
        url: '/sistema/choferes',
        permission: 'ver_choferes',
    },
    {
        nombre: 'Ver tipo de medidas de fuerza',
        url: '/sistema/tipos-medidas-de-fuerza',
        permission: 'ver_tipo_de_medidas_de_fuerza',
    },
    {
        nombre: 'Ver motivo de medidas de fuerza',
        url: '/sistema/motivos-de-medida-de-fuerza',
        permission: 'ver_motivos_de_medida_de_fuerza',
    },
    {
        nombre: 'Ver gestion de usuarios',
        url: '/sistema/gestion-de-usuarios',
        permission: 'ver_gestion_de_usuarios',
    }
]

export default function SessionWatcher({sessionData}:{sessionData:any}){
    const {openSnackbar} = useGlobalContext();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sessionState, setSessionState] = useState<{
        permisos: Array<string>,
        roles: Array<string>,
    }>({
        permisos:[],
        roles:[],
    })

    const pathname = usePathname();

    useEffect(() => {
        // console.log(sessionData)
        if(sessionData){

            setSessionState((prev:any)=>({
                ...prev,
                roles: sessionData.map((item:any)=>item.nombre),
                permisos: sessionData.map((item:any)=>item.permisos.map((permiso:any)=>permiso.nombre)).reduce((acc: string | any[], val: any) => acc.concat(val), [])
            }))

        }
    }, []);

    useEffect(() => {
        const datos_sesion : any = {...session}

        // console.log(session)
        if (status === 'unauthenticated') {
            signIn();
        }


    }, [status]);

    const permissionValidator = ()=>{

        // Se obtiene objeto de pagina actual
        // @ts-ignore
        const paginaActualObject :{permission:String} = pageMapping ? pageMapping.find(page => pathname.startsWith(page.url)) : [];

        // console.log(paginaActualObject);

        // Se verifica si es administrador
        if(sessionState && sessionState.roles.includes('administrador')){
            return true
        }else{
            if(sessionState && paginaActualObject?.permission){

                // Si dentro de la lista de permisos existe el permiso de la pagina actual retorna true
                return sessionState.permisos.includes(paginaActualObject?.permission as string);
            }else{
                return  false;
            }
        }

    }

    if (!session) {
        // toast.warning('Favor iniciar sesión')
    }else{


        if(!permissionValidator()){
            router.push('/inicio')
            openSnackbar(`No tiene permiso para ver esta pagina.`, 'warning');
        }
    }

    return (
        <>
            {/*<Toaster />*/}
        </>
    );

}