import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import * as React from "react";

export default function PenitenciariaFilter() {


    return (
        <Paper elevation={1} sx={{padding: '20px'}}>
            <Box>
                <Typography variant={'overline'}>
                    Penitenciaria
                </Typography>
                <Grid container mt={0} spacing={2}>
                    <Grid item xs={5}>
                        <TextField id="outlined-basic" label="Penitenciaria" variant="outlined" fullWidth
                                   value='Minga Guazu' size="small"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="outlined-basic" type='date' label="Fecha inicial" variant="outlined" fullWidth
                                   value='mm/dd/yyyy' size="small"/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="outlined-basic" type='date' label="Fecha final" variant="outlined" fullWidth
                                   value='mm/dd/yyyy' size="small"/>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack direction="row" spacing={2}>
                            <Button fullWidth variant="contained" sx={{

                                minHeight: "100%",

                            }}>
                                Filtrar
                            </Button>

                            <Button fullWidth variant="outlined" sx={{
                                minHeight: "100%"
                            }}>
                                Generar PDF
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Paper>

    )
}