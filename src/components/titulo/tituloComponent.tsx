'use client'

import {Stack, Typography, Box, Grid} from "@mui/material";
import * as React from "react";
import StatusNav from "@/components/StatusNav";
import {useEffect, useState} from "react";
import {getRecord} from "@/app/api";
import {useGlobalContext} from "@/app/Context/store";

interface propsType {
    titulo: string;
    url?: string;
}



export default function TituloComponent({titulo, url}: propsType) {
    const [datos, setDatos] = useState<{ id: number, medidaSeguridad: string }>({id: 0, medidaSeguridad: ''});
    const {openSnackbar} = useGlobalContext();


    useEffect(() => {

            if(url){
                const fetchData = async () => {
                    const result = await getRecord(url);
                    if (result.success) {
                        setDatos(result.data);
                    } else {
                        //console.log(result.message)
                        // @ts-ignore
                        openSnackbar(result.message, "error");
                    }
                };
                fetchData();
            }

    }, [url, ]);

    // TODO: en el status nav no se pasan datos dinamicos porque solo funciona con medidas de seguridad y no con cualquiera
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between"
               alignItems="center">
            <Box>
                <Typography variant='h4' sx={{
                    textTransform: 'math-auto',
                }}>{titulo ? titulo : datos.medidaSeguridad}</Typography>
                <Grid container>
                    <Grid item>
                        <Box mt={2}>
                            <StatusNav lastItem={datos.medidaSeguridad ? datos.medidaSeguridad  : titulo}/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>

            </Box>
        </Stack>


    )
}