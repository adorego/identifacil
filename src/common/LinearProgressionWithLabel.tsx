import { Box, LinearProgress, Typography } from "@mui/material"
export interface LinearProgressionWithLabelProps{
  indicador:number;
  estado:string;
}
const LinearProgressionWithLabel = (props:LinearProgressionWithLabelProps) =>{
  return(
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" value={props.indicador} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{props.estado}</Typography>
            </Box>
      </Box>
  )
}

export default LinearProgressionWithLabel