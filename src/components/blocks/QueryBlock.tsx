import * as React from "react";
import {Grid, TextField, Typography, Button} from "@mui/material";
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
                        <Grid container mt={1} spacing={2}>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="PPL" variant="outlined" fullWidth  />
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