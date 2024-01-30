'use client'

import * as React from 'react';

import {Box, Breadcrumbs, Link, Typography} from "@mui/material";

import CustomTable from "../../../../components/CustomTable";
import TituloComponent from "../../../../components/titulo/tituloComponent";

export default function Page(){

    return(
        <Box>
            {/*<TituloComponent titulo='Roles'/>*/}
            <Box mt={4}>
                <CustomTable
                    options={{
                        title: 'Roles',
                        pagination:true,
                        rowsPerPageCustom: 5,
                        newRecord: '/sistema/roles/[id]',
                        deleteOption:false,
                    }}
                />

            </Box>

        </Box>
    )
}