import {Grid, Typography} from "@mui/material";
import {useState} from "react";


export default function BloqueGaleria(){

    const [stateGaleria, setStateGaleria] = useState({})

    const handleAgregarFoto = (event: { current: { value: any; }; }, tipo: any)=>{
        setStateGaleria(prev=>({
            ...prev,
                tipo: event.current.value,
        }))
    }

    return(
        <>
            <Typography variant='h6'>
                Registro Fotografrico
            </Typography>
            <Grid container spacing={2} mt={1}>
                <Grid item sm={12}>
                    asd
                </Grid>
            </Grid>
        </>
    )
}