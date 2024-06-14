'use client'

import * as React from 'react'
import {Box, CircularProgress, Paper} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";

const header = [
    { id: 'id', label: 'ID' },
    { id: 'caratula_expediente', label: 'Caratula' },
    { id: 'numeroDeExpediente', label: 'Nro. de expediente' },
    { id: 'condenado', label: 'Situación procesal', type: 'boolean' },
    { id: 'fecha_del_hecho', label: 'Fecha del hecho', type: 'date' },
]

export default function TabDatosPersonales({idPersona=null} : { idPersona: number | null | undefined }) {
    const [value, setValue] = React.useState('1');
    const [data, setData] = useState(null);

    useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`;
        fetchData(apiUrl)
            .then(fetchedData => {

                setData(fetchedData.filter((expediente:any) =>
                    expediente.ppls_en_expediente.some((ppl:any) =>
                        ppl.ppl.persona.id === idPersona
                    )
                ));
            });
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (!data) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <CircularProgress/>
            </Box>
        );
    }
    return (
        <Box mt={3}>

            <Paper elevation={1}>

                <Box>
                    {/* Tabs*/}

                    <TabContext value={value}  aria-orientation='vertical'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab  label="Expedientes judiciales" value="1" />
                                {/*<Tab label="Audiencias" disabled  value="2" />
                                <Tab label="Libertades" disabled  value="3" />*/}
                            </TabList>
                        </Box>
                        <Box>
                            <TabPanel value="1" sx={{p:'0'}}>
                                <Box>
                                    <Box p={3}>
                                        {/*<FiltrosTables/>*/}
                                    </Box>
                                    <CustomTable
                                        headers={header}
                                        data={data}
                                        showId={true}
                                        options={{
                                            rowsPerPageCustom:5,
                                            deleteOption: false,
                                            pagination: true,
                                            targetURL: '/expedientes'
                                        }}
                                    />
                                </Box>
                            </TabPanel>
                            {/*<TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>*/}
                        </Box>

                    </TabContext>


                </Box>
            </Paper>
        </Box>
    )
}