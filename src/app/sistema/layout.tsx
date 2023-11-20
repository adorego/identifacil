
import React from "react";
import AlternateLayout from "../layouts/AlternateLayout";

export default function MainLayout({children,}: { children: React.ReactNode}) {

     // TODO: Hacer Modulo para Medidas de seguridad
     // TODO: Autorizadores de traslados
     // TODO: Motivos de traslados
     // TODO: Custodios
     // TODO: Vehiculos de traslados
     // TODO: Custodios
     // TODO: Establecimientos penitenciarios
    // ----------------------------------------
     // TODO: CAMARAS -> AGREGAR CAMPO PUERTO

    return (
        <>
            <AlternateLayout>
                {children}
            </AlternateLayout>

        </>

    )
}