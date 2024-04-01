import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material"
export interface LinearProgressionWithLabelProps{
  indicador:number;
  estado:string;
}
const CircularProgressionWithLabel = (props:LinearProgressionWithLabelProps) =>{
  return(
      <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center' }}>
            <Box sx={{  }}>
              <CircularProgress size={60} />
            </Box>
            <Box>
              <Typography mt={3} variant="h6" color="text.secondary">
                  {props.estado}
              </Typography>
            </Box>
      </Box>
  )
}

export default CircularProgressionWithLabel