
import * as React from 'react';
import ReportesPDF from '@/app/(pdf)/reportes/reportesPDF';

const Page = () =>{

    return(
        <>
            <ReportesPDF params={{tipoReporte: 'ingresos'}} />
        </>
    )
}

export default Page