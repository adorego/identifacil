import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {KeyboardArrowRight} from "@mui/icons-material";
import Link from "next/link";
import * as React from "react";
import {ReactNode} from "react";

type cardReportType = {
    nombre?: string;
    link?: string;
    icon?: ReactNode;
}

const styles = {
    link:{
        textDecoration: 'none',
        color: '#00a76f',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
    }
}
const cardReport = ({nombre = "", link="https://www.google.com/", icon}: cardReportType) => {
    return(
        <>
            <Card style={{cursor: 'pointer'}}>
                <CardContent>
                    <Grid container>
                        <Grid item sm={2}>
                            {icon}
                        </Grid>
                        <Grid item sm={10} >
                            <Box sx={{background: '#FFF'}}>
                                <Typography variant="h6"
                                            style={{
                                                textAlign: 'left',
                                                textDecoration: 'none'
                                            }}>
                                    {nombre}
                                </Typography>
                                <Link href={link} style={styles.link}>
                                    Ver más <KeyboardArrowRight />
                                </Link>
                            </Box>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default cardReport;