import {Button, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";


export default function TabTitle({tabName, targetURL}){


    return(
        <Grid container spacing={2} mb={2}>
            <Grid item sm={12}>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant='h5' mt={0}>
                        {tabName}
                    </Typography>
                    {targetURL?
                        (<Button variant='contained' href={targetURL}>
                            Agregar {tabName}
                        </Button>)
                    : ''
                    }

                </Stack>
            </Grid>
        </Grid>
    )
}