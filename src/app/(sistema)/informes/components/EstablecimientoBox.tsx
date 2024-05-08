'use client'

import {Box, Typography} from "@mui/material";
import {useGlobalContext} from "@/app/Context/store";
import {useEffect, useState} from "react";

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API

export default function EstablecimientoBox(){

    const { selectedEstablecimiento, setSelectedEstablecimiento } = useGlobalContext();
    const [establecimientostate, setEstablecimientostate] = useState<any>({});

    console.log(selectedEstablecimiento)

    useEffect(() => {

        fetch(`${API_URL}/establecimientos`).then((res)=>{
            return res.json()
        }).then((data)=>{
            const establecimientoObj = data.establecimientos.find((item:any)=> selectedEstablecimiento == item.id)
            setEstablecimientostate(establecimientoObj)
        })

    }, [selectedEstablecimiento]);

    return(
        <Box sx={{ textAlign: 'left', marginLeft: '20px'}}>
            <Typography variant='h4' sx={{fontWeight: '700'}}>
                {establecimientostate?.capacidad ? establecimientostate.capacidad : 'N/D'}
            </Typography>
            <Typography variant='h6'>
                Capacidad total
            </Typography>
        </Box>
    )
}