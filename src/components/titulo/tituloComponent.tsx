'use client'

import {Stack, Typography, Box, Grid, Button} from "@mui/material";
import * as React from "react";
import StatusNav from "@/components/StatusNav";
import {ReactNode, useEffect, useState} from "react";
import {getRecord} from "@/app/api";
import {useGlobalContext} from "@/app/Context/store";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";





export default function TituloComponent({titulo, url = "", newEntry = "", children=null}: {titulo:string; url?:string; newEntry?: string, children?: ReactNode }) {
    const [datos, setDatos] = useState<{ id: number, medidaSeguridad: string }>({id: 0, medidaSeguridad: ''});
    const {openSnackbar} = useGlobalContext();


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!url.includes("/crear" && url)) {

                const fetchData = async () => {
                    const result = await getRecord(url);
                    {console.log(result)}
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


    }, [url]);

    // TODO: en el status nav no se pasan datos dinamicos porque solo funciona con medidas de seguridad y no con cualquiera
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between"
               alignItems="center">
            <Box>

                <Typography variant='h4' sx={{
                    textTransform: 'math-auto',
                }}>
                    {titulo ? titulo : datos.medidaSeguridad}
                </Typography>

                <Grid container>
                    <Grid item>
                        <Box mt={2}>
                            { children ? children
                                : <StatusNav lastItem={datos.medidaSeguridad ? datos.medidaSeguridad : titulo} />
                             }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                {newEntry
                    ? (
                        <Link href={newEntry}>
                            <Button variant='contained' startIcon={<AddIcon />}>

                                    Agregar {titulo}

                            </Button>
                        </Link>
                    )
                    :''
                }
            </Box>
        </Stack>


    )
}