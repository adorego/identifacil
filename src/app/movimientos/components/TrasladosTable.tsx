import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    /*{ field: 'id', headerName: 'ID', width: 70 },*/
    { field: 'documento', headerName: 'Documento', width: 400 },
    { field: 'tipoTraslado', headerName: 'Tipo traslado', width: 200 },
    { field: 'fechaTraslado', headerName: 'Fecha traslado', width: 200 },
    { field: 'destino', headerName: 'Destino', width: 200 },
    /*{
        field: 'age',
        headerName: 'Tipo de doc',
        type: 'number',
        width: 90,
    }*/
];

const rows = [
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
    { id: 1, documento: '123456/1234', tipoTraslado: '01/01/2023', fechaTraslado: '01/01/2023', destino: 'Tacumbu'},
];


export default function TrasladosTable(){

    return (
        <div style={{ height: 400, width: '100%' }} sx={{bgcolor:'red' }}>
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



