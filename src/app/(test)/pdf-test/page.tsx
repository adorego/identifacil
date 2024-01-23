'use client'

import PDF from "@/app/(test)/pdf-test/PDF";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import {Button} from "@mui/material";


export default function Page(){


    return(
        <>

            <PDFDownloadLink document={<PDF />} fileName='myfirstped.pdf' >
                {
                    ({loading,error,url,blob}) => loading ? <button>
                        Loading Document
                    </button> :
                        <button>
                            Descargar ahora
                        </button>
                }
            </PDFDownloadLink>

            <PDFViewer>
                <PDF />
            </PDFViewer>

        </>
    )
}