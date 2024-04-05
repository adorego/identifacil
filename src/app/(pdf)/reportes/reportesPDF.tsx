'use client'

import IngresosPDF from "@/app/(pdf)/reportes/ingresosPDF";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import {Box, Button} from "@mui/material";
import {ReactNode, useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API
export default function ReportesPDF({ params }: { params: { tipoReporte: string } }) {

    const [state, setState] = useState('')
    const [isClient, setIsClient] = useState(false)


    useEffect(() => {

        setIsClient(true)
        const apiUrl = `${API_URL}/gestion_ppl/ppls`; // Puedes cambiar la URL según tus necesidades

        fetchData(apiUrl)
            .then(fetchedData => {
                console.log(fetchedData)
                console.log(fetchedData.filter((item:any)=>item.datosDeSalud?.saludMental?.sigue_tratamiento_mental == false))
                console.log(fetchedData.filter((item:any)=>item.datosDeSalud?.saludMental?.sigue_tratamiento_mental == true))

                // @ts-ignore
                setState((prev:any)=>({
                    poblacion: fetchedData.length,
                    condenados: fetchedData.filter((item:any)=>item.datosJudiciales?.ingresos_a_prision?.length > 0).length,
                    procesados: fetchedData.length - fetchedData.filter((item:any)=>item.datosJudiciales?.ingresos_a_prision?.length > 0).length,
                    salud_mental: fetchedData.filter((item:any)=>item.datosDeSalud?.saludMental?.sigue_tratamiento_mental == true).length,
                    limitaciones_idiomaticas: fetchedData.filter((item:any)=>item.datosDeSalud?.limitacionesIdiomaticas?.tieneDificultadParaLeerYEscribir_modificado == true).length,
                    vih: fetchedData.filter((item:any)=>item.datosDeSalud?.vih == true).length,
                    comunidad: fetchedData.filter((item:any)=>item.datosPersonales?.perteneceAComunidadLGTBI == true).length,
                    // procesados: fetchedData.filter((item: { datosJudiciales: { ingresos_a_prision: any; }; })=>item.datosJudiciales.ingresos_a_prision)
                }));
            });
    }, []);



    return(
        <>

            {/*<PDFDownloadLink document={<IngresosPDF data={state} />} fileName='myfirstped.pdf' >
                {
                    ({loading,error,url,blob}) => loading ? <button>
                        Loading Document
                    </button> :
                        <button>
                            Descargar ahora
                        </button>
                }
            </PDFDownloadLink>*/}
            { isClient ?
            <Box sx={{
                height: 'calc(100vh - 20px)'
            }}>
                <PDFViewer showToolbar={true} width='100%' height='100%'>
                    <IngresosPDF data={state} />
                </PDFViewer>
            </Box>
                : null}
        </>
    )
}