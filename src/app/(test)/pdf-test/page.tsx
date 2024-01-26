'use client'

import PDF from "@/app/(test)/pdf-test/PDF";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";


export default function Page(){

    const [state, setState] = useState('')

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/parteDiario'; // Puedes cambiar la URL según tus necesidades
        fetchData(apiUrl)
            .then(fetchedData => {
                setState(fetchedData);
            });
    }, []);



    return(
        <>

            {/*<PDFDownloadLink document={<PDF data={state} />} fileName='myfirstped.pdf' >
                {
                    ({loading,error,url,blob}) => loading ? <button>
                        Loading Document
                    </button> :
                        <button>
                            Descargar ahora
                        </button>
                }
            </PDFDownloadLink>*/}
            <Box sx={{
                mt: 2,
            }}>
                <PDFViewer showToolbar={true} width='100%' height='940px'>
                    <PDF data={state[0]} />
                </PDFViewer>
            </Box>

        </>
    )
}