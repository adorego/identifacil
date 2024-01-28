import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {Grid} from "@mui/material";

export function FormSkeleton() {
    return (
        <Grid container>
            <Grid item sm={6}>

                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />

                    <Skeleton animation="wave" height={60} />
                <Stack direction='row' spacing={2}>

                    <Skeleton animation="wave" height={60} width='250px' />
                    <Skeleton animation="wave" height={60} width='250px' />
                </Stack>


            </Grid>
        </Grid>

    );
}