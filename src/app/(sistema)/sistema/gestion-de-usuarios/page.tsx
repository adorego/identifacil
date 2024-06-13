import TituloComponent from "@/components/titulo/tituloComponent";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import * as React from "react";
import TableView from "@/app/(sistema)/sistema/gestion-de-usuarios/components/tableView";



export default function Page(){

    const listaDeItemBread = [
        {nombre:'Gestion de usuarios', url:'', lastItem: true},
    ];
    return(
        <>
            <TituloComponent titulo='Gestion de usuarios'>
                <BreadCrumbComponent listaDeItems={listaDeItemBread} />
            </TituloComponent>

            {/* Vista de Tabla de Usuarios, roles y permisos*/}
            <TableView />
        </>
    )
}




