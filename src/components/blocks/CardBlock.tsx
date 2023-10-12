import * as React from "react";
import {Card, CardActions, CardContent, CardMedia, Grid, Typography, Button} from "@mui/material";
import splash from '../../common/splash-img.png';

export default function CardBlock({name, link,image}){

    return(

            <Grid item sm={4}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={splash.src}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant={"contained"} sx={{
                            boxShadow: "none",
                        }}>Continuar</Button>
                    </CardActions>
                </Card>
            </Grid>

    )
}