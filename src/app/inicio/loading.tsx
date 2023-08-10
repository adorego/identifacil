import { Box, CircularProgress, Grid } from "@mui/material";

export default function Loading(){
  return(
    <Grid container>
      <Grid item xs={12}>
        <Box 
        sx={{
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center", 
        height:"100vh"}}>
          <CircularProgress size={40} />
        </Box>
      </Grid>
    </Grid>
    
  )
}