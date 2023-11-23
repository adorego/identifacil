'use client';

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
    TableSortLabel, Typography, Box, Stack, Button,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {dummyData} from "../app/dummyData/data";

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


const { headersCustom, rowsCustom } = dummyData();

const rowStyle = {
    width: '100px',
}

function CustomTable({
                         showId= false,
                         data=rowsCustom,
                         headers=headersCustom,
                         options={
                             rowsPerPageCustom:5,
                             pagination:true,
                             title: '',
                             targetURL:"",
                             expandedList: '',
                             newRecord: '',
                         }}: CustomTableProps): JSX.Element {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(options.rowsPerPageCustom);
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

    const stackStyle = {
        padding: (options.title || options.newRecord ) ? '20px' : '0px',
        // Aquí puedes agregar más estilos si es necesario
    };

    return (
        <Box>
            {console.log(data)}
            <TableContainer component={Paper}>

                <Stack direction='row'
                           justifyContent="space-between"
                           alignItems="center"
                           spacing={2}
                           sx={stackStyle}

                    >
                        <Box>
                            {options.title ?
                                (
                                    <Typography variant='h5' display='block'>
                                        {options.title}
                                    </Typography>
                                )
                                : ''}
                        </Box>
                        <Box>
                            {options.newRecord ?
                                (
                                    <Button variant='contained' href={options.newRecord}>
                                        Agregar
                                    </Button>
                                )
                                : ''}

                        </Box>
                    </Stack>



                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => {
                                if (header.id === 'id' && !showId) return null;
                                return(
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
                                )
                            })}
                            {options.targetURL ?
                                <TableCell >Acciones</TableCell>
                                : ''
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            slicedData.map((row) => (
                                <TableRow key={row.id as number}>
                                    {headers.map((header) => {
                                        if (header.id === 'id' && !showId) return null;

                                        return <TableCell sx={(header.id == 'id' ? rowStyle : {})} key={header.id}>{row[header.id]}</TableCell>;
                                    })}
                                    {options.targetURL ? (
                                        <TableCell sx={rowStyle}>
                                            <IconButton

                                                color="primary"
                                                aria-label="Edit"
                                                component={Link}
                                                //href={`${options.targetURL}`}
                                                href={`${options.targetURL}/${row.id}`}
                                                onClick={() => handleCellClick(row.id as number)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    ) : (
                                        ''
                                    )}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <>
                    {options.pagination?
                        (
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        ):''}
                    {
                        options.expandedList ?
                            (
                                <Box sx={{
                                    margin: '20px',
                                    textAlign: 'right',
                                }}>
                                    <Link
                                        sx={{
                                            display: 'inline-flex',
                                            alignIems: 'flex-end',
                                            height: '20px',
                                            fontWeight: '600',
                                        }}
                                        color='inherit' href={options.expandedList} underline="none">Ver mas <ChevronRightIcon /></Link>
                                </Box>
                            )
                            : ''
                    }
                </>

            </TableContainer>
        </Box>


    );
}

export default CustomTable;
