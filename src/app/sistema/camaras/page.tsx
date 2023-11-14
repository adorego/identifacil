'use client'

import * as React from 'react';
import {Box, Breadcrumbs, Link, Typography} from "@mui/material";
import TituloComponent from "../../../components/titulo/tituloComponent";
import CustomTable from "../../../components/CustomTable";

export default function Page(){

    return(
        <Box>
            <TituloComponent titulo='Camaras'/>
            <Box mt={4}>
                <CustomTable
                    options={{
                        /*title: 'Lista de camaras',*/
                        pagination:true,
                        rowsPerPageCustom: 5,
                        newRecord: '/sistema/camaras/crear'
                    }}
                />

            </Box>

        </Box>
    )
}