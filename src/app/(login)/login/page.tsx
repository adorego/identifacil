'use client'

import {Box, Button, CssBaseline, Grid, Link, Paper, TextField, Typography} from '@mui/material';

import splash from '../../../common/images/logo-sippy.png';
import styles from './layout.module.css'
import {useRouter} from 'next/navigation';
import { useState } from 'react';
import {signIn} from "next-auth/react";

interface datosIdentificacion{
    numeroDeDocumento:string;
    clave:string;
}

const datosIdentificacionInicial:datosIdentificacion = {
    numeroDeDocumento:"",
    clave:""
}

export default function Login() {
    const router = useRouter();
    const [estadoFormularioLogin, setEstadoFormularioLogin] = useState(datosIdentificacionInicial);

    const onAceptarClick = async () => {


        /*const responseNextAuth = await signIn('credentials', {
            username: estadoFormularioLogin.numeroDeDocumento,
            password: estadoFormularioLogin.clave,
            redirect: false,
        })

        console.log(responseNextAuth)*/
        if(estadoFormularioLogin.numeroDeDocumento === "111111" && estadoFormularioLogin.clave === "admin"){
            router.push('/inicio');
        }
    };


    const onChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setEstadoFormularioLogin(
            (previus) =>{
                return{
                    ...previus,
                    [event.target.name]:event.target.value
                }
            }
        )
    }

    return (
        <>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid item xs={false} sm={6} md={7} sx={{
                        backgroundImage: `url(${splash.src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'auto',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} className={styles.gridLogin} sx={{
                          borderLeft: '1px solid #e3f9e8',
                          boxShadow: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                      }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Iniciar Sesión
                        </Typography>
                        {/*<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>*/}
                        <hr/>
                        {/*<Typography component="h1" variant="h5">
                            Iniciar Sesion
                        </Typography>*/}
                        <Box component="form" noValidate sx={{mt: 1}}>
                            <TextField
                                value={estadoFormularioLogin.numeroDeDocumento}
                                onChange={onChange}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Número de documento"
                                name="numeroDeDocumento"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                value={estadoFormularioLogin.clave}
                                onChange={onChange}
                                margin="normal"
                                required
                                fullWidth
                                name="clave"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/*<FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />*/}

                            <Button
                                onClick={onAceptarClick}
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{mt: 3, mb: 2}}
                            >
                                Iniciar sesión
                            </Button>
                            <Grid container textAlign={'center'}>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </Grid>
                                <Grid item>

                                </Grid>
                            </Grid>

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


