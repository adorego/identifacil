import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Link,
    IconButton,
    TablePagination,
    TableSortLabel,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Header {
    id: string;
    label: string;
}

interface Data {
    [key: string]: string | number;
}

interface CustomTableProps {
    data: Data[];
    headers: Header[];
    targetURL: string;
}

function CustomTable({ data, headers, targetURL="" }: CustomTableProps): JSX.Element {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>(headers[0].id);

    const handleRequestSort = (property: string): void => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = data.slice().sort((a, b) => {
        const isAsc = order === 'asc';
        const property = orderBy;

        const aValue = a[property];
        const bValue = b[property];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return isAsc ? aValue - bValue : bValue - aValue;
        } else {
            if (isAsc) {
                return aValue < bValue ? -1 : 1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        }
    });

    const handleChangePage = (event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCellClick = (id: number): void => {
        console.log('Clicked cell with ID:', id);
    };

    const slicedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper}>

            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header.id}>
                                <TableSortLabel
                                    active={orderBy === header.id}
                                    direction={orderBy === header.id ? order : 'asc'}
                                    onClick={() => handleRequestSort(header.id)}
                                    IconComponent={ArrowDownwardIcon}
                                >
                                    {header.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {slicedData.map((row) => (
                        <TableRow key={row.id as number}>
                            {headers.map((header) => (
                                <TableCell key={header.id}>{row[header.id]}</TableCell>
                            ))}
                            <TableCell>
                                <IconButton
                                    color="primary"
                                    aria-label="Edit"
                                    component={Link}
                                    href={`${targetURL}`}
                                    // href={`${targetURL}/edit/${row.id}`}
                                    onClick={() => handleCellClick(row.id as number)}
                                >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default CustomTable;
