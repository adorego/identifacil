import * as React from "react";
import { Grid, Typography} from "@mui/material";


export default function DataVizWidget(){

    return(

        <Grid item>
            <Grid container spacing={2}>
                <Grid item>
                    {/* Data viz widget */}
                </Grid>
                <Grid item>
                    <Typography>Hechos Punibles</Typography>
                    <Typography variant={'h4'}>20</Typography>
                </Grid>
            </Grid>

        </Grid>

    )
}