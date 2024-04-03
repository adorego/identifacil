import {Box, Paper, Typography} from "@mui/material";
import noDataImg from "@/common/no-data-img.png"

export default function NoDataBox() {


    return (
        <>
            <Box
                component={Paper}
                mt={3}
                elevation={3}
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
                display='flex'
                minHeight='calc(100vh - 350px)'
                >
                <Box textAlign='center'>
                    <img src={noDataImg.src} alt="no-data-image"/>
                    <Typography variant='h5' mt={3} fontWeight='bold'>
                        No hay datos en este momento.
                    </Typography>
                </Box>
            </Box>
        </>
    )
}