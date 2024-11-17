import {Grid, Typography} from "@mui/material";
import CardDefensores from "@/app/(sistema)/defensores/components/cardDefensores";
import * as React from "react";

export default function DefensoresDashboard() {

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} mb={2}>
                    <Typography variant="h5" color="black" component="h5" fontWeight='bold'>
                        Bienvenido, Carlos Lopez.
                    </Typography>
                    <Typography>
                        Emboscada
                    </Typography>
                </Grid>
                <Grid item md={4}>
                    <CardDefensores />
                </Grid>
                <Grid item md={4}>
                    <CardDefensores />
                </Grid>
                <Grid item md={4}>
                    <CardDefensores />
                </Grid>
            </Grid>
        </>
    )
}