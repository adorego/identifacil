import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material"
export interface LinearProgressionWithLabelProps{
  indicador:number;
  estado:string;
}
const CircularProgressionWithLabel = (props:LinearProgressionWithLabelProps) =>{
  return(
      <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center' }}>
            <Box sx={{  }}>
              <CircularProgress size={90} />
            </Box>
            <Box sx={{}}>
              <Typography variant="h5" color="text.secondary">{props.estado}</Typography>
            </Box>
      </Box>
  )
}

export default CircularProgressionWithLabel