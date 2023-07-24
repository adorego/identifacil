'use client'

import { Button, Grid, TextField, Typography } from '@mui/material';

import Container from '@mui/material/Container';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Login(){
  const router = useRouter();

  const onAceptarClick = () =>{
    console.log("navigate");
    router.push('/main');
  };
  return(
    <>
    <Container 
    sx={{margin:"10% 0px 0px 25%",padding:"20px", borderRadius:"20px" ,backgroundColor:"white", border:"2px solid black"}} 
    maxWidth="sm">
        <Grid direction="column" alignContent="center" textAlign="center" container spacing={2}>
          <Grid item xs={12} >
            <Typography variant='h3'>Bienvenido a IdentiFácil</Typography>
          </Grid>
          <Grid item xs={12} >
            <Typography variant='h6'>Ingrese su C.I. y clave por favor</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField variant="standard" label="C.I." />
          </Grid>
          <Grid item xs={12}>
            <TextField size='medium' variant="standard" type='password' label="Clave" />
          </Grid>
          <Grid item xs={12} >
            <Button onClick={onAceptarClick} >Ingresar</Button>
          </Grid>
        </Grid>
    </Container>
    </>

  )
}


