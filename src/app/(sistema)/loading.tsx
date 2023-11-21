import {Grid, LinearProgress} from "@mui/material";

export default function Loading() {
    return (
        <Grid container>
            <Grid item xs={12}>

                    <LinearProgress />
            </Grid>
        </Grid>

    )
}