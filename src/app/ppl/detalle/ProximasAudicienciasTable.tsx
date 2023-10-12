import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    /*{ field: 'id', headerName: 'ID', width: 70 },*/
    { field: 'descripcion', headerName: 'Descripcion', width: 300 },
    { field: 'accion', headerName: 'Ver detalle', width: 60 },
    /*{
        field: 'age',
        headerName: 'Tipo de doc',
        type: 'number',
        width: 90,
    }*/
];

const rows = [
    { id: 1, descripcion: 'Autorizacion de PPL para poder salir a trabajar', accion: 'Ver más' },
    { id: 2, descripcion: 'Autorizacion de PPL para poder salir a trabajar', accion: 'Ver más' },
    { id: 3, descripcion: 'Autorizacion de PPL para poder salir a trabajar', accion: 'Ver más' },
    { id: 4, descripcion: 'Autorizacion de PPL para poder salir a trabajar', accion: 'Ver más' },

];

export default function ProximasAudicienciasTable() {
    return (
        <div style={{ height: 400, width: '100%' }} sx={{bgcolor:'red' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooterPagination
                hideFooter
                initialState={{}}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}