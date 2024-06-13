'use client'

import * as React from 'react';

import {Box, Breadcrumbs, Link, Typography} from "@mui/material";

import CustomTable from "../../../../../components/CustomTable";
import TituloComponent from "../../../../../components/titulo/tituloComponent";

const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'descripcion', label: 'Descripcion'},
    {id: 'codigo', label: 'Codigo'},
    {id: 'fecha_creacion', label: 'Fecha creacion', type: 'date'},
    {id: 'ultima_actualizacion', label: 'Ultima actualizacion', type: 'date'},

]

const dataMedidas = [
    {id: 1, descripcion: 'Admnistrador de sistema', codigo: 'admin', fecha_creacion: '01/01/2024',  ultima_actualizacion: '01/02/2024'  },
    {id: 2, descripcion: 'Guardia de Acceso', codigo: 'guardia_acceso', fecha_creacion: '01/01/2024',  ultima_actualizacion: '01/02/2024'  },
    {id: 3, descripcion: 'Personal administrativo', codigo: 'personal_administrativo', fecha_creacion: '01/01/2024',  ultima_actualizacion: '01/02/2024'  },
    {id: 4, descripcion: 'Funcionar Ministerio', codigo: 'funcionar_ministerio', fecha_creacion: '01/01/2024',  ultima_actualizacion: '01/02/2024'  },
]

export default function Page(){

    return(
        <Box>
            {/*<TituloComponent titulo='Roles'/>*/}
            <Box mt={4}>
                <CustomTable
                    headers={header2}
                    data={dataMedidas}
                    options={{
                        title: 'Roles',
                        pagination:true,
                        rowsPerPageCustom: 5,
                        newRecord: '/sistema/roles/crear',
                        deleteOption:false,
                    }}
                />

            </Box>

        </Box>
    )
}