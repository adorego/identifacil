'use client'

import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography
} from '@mui/material';

import {redirect} from 'next/navigation';
import splash from '../../common/splash-img.png';
import styles from './layout.module.css'
import {useRouter} from 'next/navigation';

export default function Login() {
    const router = useRouter();

    const onAceptarClick = () => {
        console.log("navigate");
        router.push('/inicio');
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
                    sm={6}
                    md={8}
                    sx={{
                        backgroundImage: `url(${splash.src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                    }}
                />
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square
                      className={styles.gridLogin}
                      sx={{
                          borderLeft:'1px solid #e3f9e8',
                          boxShadow: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',

                }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            IDENTIFACIL
                        </Typography>
                        {/*<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>*/}
                        <hr/>
                        {/*<Typography component="h1" variant="h5">
                            Iniciar Sesion
                        </Typography>*/}
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
                                <Grid item xs >
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


