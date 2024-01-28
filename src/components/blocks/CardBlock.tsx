'use client';

import * as React from "react";
import {usePathname, useRouter} from "next/navigation";

import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";

import splash from '../../common/splash-img.png';
import Link from "next/link";


export default function CardBlock({name="", link="", image="", size=4}){
    const router = useRouter();

    const handleNavigation = (url: string) => {
        router.push(url);
    }
    return(

            <Grid item sm={size}>
                <Link href={link}>
                    <Card style={{cursor: 'pointer'}}>
                        <CardMedia
                            sx={{ height: '250px', margin: '10px', borderRadius: '6px' }}
                            image={image}
                            title={name}
                        />
                        <CardContent>
                            <Typography variant="h6"
                                        style={{
                                            textAlign: 'left',
                                            textDecoration: 'none'
                                        }}>
                                {name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>

            </Grid>

    )
}