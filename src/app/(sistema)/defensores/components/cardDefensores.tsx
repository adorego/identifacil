import Box from "@mui/material/Box";
import {PeopleAltTwoTone} from "@mui/icons-material";
import {Stack, Typography} from "@mui/material";
import * as React from "react";


export default function CardDefensores({value=0,nombre='Default title'}:{value:number,nombre:string}) {

    return(
        <>
            <Stack spacing={2} direction='row'
                   sx={{
                       border: '1px solid lightgray',
                       padding: '20px 20px',
                       borderRadius: '5px',
                   }}>

                <Box>
                    <PeopleAltTwoTone fontSize='large' />
                </Box>
                <Box>
                    <Typography variant="h6" color="black" fontWeight='bold'>
                        {value}
                    </Typography>
                    <Typography>
                        {nombre}
                    </Typography>
                </Box>
            </Stack>
        </>
    )
}