'use client'

import IngresosPDF from "@/app/(pdf)/reportes/ingresosPDF";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import {Box, Button} from "@mui/material";
import {ReactNode, useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";


export default function ReportesPDF({ params }: { params: { tipoReporte: string } }) {

    const [state, setState] = useState('')
    const [isClient, setIsClient] = useState(false)


    useEffect(() => {

        setIsClient(true)
        const apiUrl = 'http://localhost:5000/parteDiario'; // Puedes cambiar la URL según tus necesidades
        fetchData(apiUrl)
            .then(fetchedData => {
                setState(fetchedData);
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
                    <IngresosPDF data={state[0]} />
                </PDFViewer>
            </Box>
                : null}
        </>
    )
}