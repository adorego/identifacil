import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    /*{ field: 'id', headerName: 'ID', width: 70 },*/
    { field: 'descripcion', headerName: 'Drescripcion del documento', width: 400 },
    { field: 'fecha', headerName: 'Fecha', width: 130 },
    { field: 'tipoDoc', headerName: 'Tipo de doc', width: 130 },
    /*{
        field: 'age',
        headerName: 'Tipo de doc',
        type: 'number',
        width: 90,
    }*/
];

const rows = [
    { id: 1, fecha: '20/01/2023', descripcion: 'Autorizacion de PPL para poder salir a trabajar', tipoDoc: 'OJ-Autorizacion' },
    { id: 2, fecha: '20/01/2023', descripcion: 'Autorizacion de PPL para poder salir a trabajar', tipoDoc: 'OJ-Autorizacion' },
    { id: 3, fecha: '20/01/2023', descripcion: 'Autorizacion de PPL para poder salir a trabajar', tipoDoc: 'OJ-Autorizacion' },
    { id: 4, fecha: '20/01/2023', descripcion: 'Autorizacion de PPL para poder salir a trabajar', tipoDoc: 'OJ-Autorizacion' },
    { id: 5, fecha: '20/01/2023', descripcion: 'Autorizacion de PPL para poder salir a trabajar', tipoDoc: 'OJ-Autorizacion' },
    { id: 6, fecha: '20/01/2023', descripcion: 'Autorizacion de PPL para poder salir a trabajar', tipoDoc: 'OJ-Autorizacion' },
    { id: 7, fecha: '20/01/2023', descripcion: 'Autorizacion de PPL para poder salir a trabajar', tipoDoc: 'OJ-Autorizacion' },
    { id: 8, fecha: '20/01/2023', descripcion: 'Autorizacion de PPL para poder salir a trabajar', tipoDoc: 'OJ-Autorizacion' },
    { id: 9, fecha: '20/01/2023', descripcion: 'Autorizacion de PPL para poder salir a trabajar', tipoDoc: 'OJ-Autorizacion' },
];

export default function DocumentosJudicialesTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}