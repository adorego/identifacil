import * as React from 'react'
import {Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, IconButton} from "@mui/material";
import {Visibility, Delete} from '@mui/icons-material/';

interface tablaCirculoTypes {
    rows?: {
        nombre: string;
        relacion: number;
        establecimiento: number | null;
        vinculo_sistema: string;
    }[];
}



export const TablaCirculoFamiliar: React.FC<tablaCirculoTypes> = ({rows}) => {


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    { rows ?
                    <TableRow>
                        <TableCell>Nombre y apellido</TableCell>
                        <TableCell align="right">Consanguineidad</TableCell>
                        <TableCell align="right">Lugar</TableCell>
                        <TableCell align="right">Vinculo sistema</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                        : null }
                </TableHead>
                <TableBody>
                    { rows ?
                        rows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.nombre}
                                    </TableCell>
                                    <TableCell align="right">{row.relacion}</TableCell>
                                    <TableCell align="right">{row.establecimiento}</TableCell>
                                    <TableCell align="right">{row.vinculo_sistema}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="edit">
                                            <Visibility/>
                                        </IconButton>
                                        <IconButton aria-label="delete">
                                            <Delete/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        : null
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )
}