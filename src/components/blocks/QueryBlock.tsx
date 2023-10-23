import * as React from "react";
import {Grid, TextField, Typography, Button, InputLabel} from "@mui/material";
import {Storage} from "@mui/icons-material";

export default  function QueryBlock(){

    return(
        <>
            <Grid container mt={2}>
                <Grid item xs={12}>
                    <div className='cardContainer '>
                        <Typography variant={'overline'}>
                            Buscardor de PPL
                        </Typography>
                        <Grid container mt={0} spacing={2}>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="PPL" variant="outlined" fullWidth value='Juan Jose Perez Martinez' size="small"/>
                            </Grid>
                            <Grid item>
                                <Button  variant="contained" sx={{
                                    paddingX: '60px',
                                    minHeight:"100%"
                                }}>
                                    Consultar
                                </Button>
                            </Grid>
                        </Grid>
                    </div>

                </Grid>
            </Grid>
        </>
    )
}