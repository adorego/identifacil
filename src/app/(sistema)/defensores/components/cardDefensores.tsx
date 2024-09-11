import Box from "@mui/material/Box";
import {PeopleAltTwoTone} from "@mui/icons-material";
import {Stack, Typography} from "@mui/material";
import * as React from "react";


export default function CardDefensores() {

    return(
        <>
            <Stack spacing={2} direction='row'
                   sx={{
                       border: '1px solid lightgray',
                       padding: '40px 20px',
                       borderRadius: '5px',
                   }}>

                <Box>
                    <PeopleAltTwoTone fontSize='large' />
                </Box>
                <Box>
                    <Typography variant="h6" color="black" fontWeight='bold'>
                        200
                    </Typography>
                    <Typography>
                        Cantidad de audiencia
                    </Typography>
                </Box>
            </Stack>
        </>
    )
}