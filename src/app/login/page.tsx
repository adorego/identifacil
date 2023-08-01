'use client'

import {
    Container, Avatar, Button, Link, Paper, Box, Grid, CssBaseline, TextField
    , FormControlLabel, Checkbox, Typography
} from '@mui/material';

import {redirect} from 'next/navigation';
import {useRouter} from 'next/navigation';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";

export default function Login() {
    const router = useRouter();

    const onAceptarClick = () => {
        console.log("navigate");
        router.push('/main');
    };


    function Copyright(props: any) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                    }}
                />
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Identifacil
                        </Typography>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar Sesion
                        </Typography>
                        <Box component="form" noValidate  sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Número de documento"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />

                            <Button
                                onClick={onAceptarClick}
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{mt: 3, mb: 2}}
                            >
                                Iniciar sesión
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"¿No tienes una cuenta? Registrate."}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/*<Container sx={{
                    margin: "10% 0px 0px 25%",
                    padding: "20px",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    border: "2px solid black"
                }}
                maxWidth="sm">
                <Grid direction="column" alignContent="center" textAlign="center" container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h3'>Bienvenido a IdentiFácil</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Ingrese su C.I. y clave por favor</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="standard" label="C.I."/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size='medium' variant="standard" type='password' label="Clave"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={onAceptarClick}>Ingresar</Button>
                    </Grid>
                </Grid>
            </Container>*/}
        </>

    )
}


