'use client'

import * as React from 'react';
import {Box, Breadcrumbs, Link, Typography} from "@mui/material";
import TituloComponent from "../../../components/titulo/tituloComponent";
import CustomTable from "../../../components/CustomTable";

export default function Page(){

    return(
        <Box>
            <TituloComponent titulo='Roles'/>
            <Box mt={4}>
                <CustomTable
                    options={{
                        /*title: 'Lista de roles',*/
                        pagination:true,
                        rowsPerPageCustom: 5,
                        newRecord: '/sistema/roles/crear'
                    }}
                />

            </Box>

        </Box>
    )
}