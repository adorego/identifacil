import { Box, CircularProgress } from "@mui/material";

export default function Loading(){
  return(
    <Box sx={{display:'flex', backgroundColor:'blue'}}>
      <CircularProgress size={60} />
    </Box>
  )
}