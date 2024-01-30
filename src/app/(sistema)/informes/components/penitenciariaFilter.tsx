'use client'

import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel, ListItemText, MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


export default function PenitenciariaFilter() {
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: { target: { value: any; }; }) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill, we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <Paper elevation={1} sx={{padding: '20px'}}>
            <Box>
                {/*<Typography variant={'overline'}>
                    Por Penitenciaria
                </Typography>*/}
                <Stack direction='row' spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel size='small' id="penitenciaria">Penitenciaria</InputLabel>
                        <Select
                            autoWidth
                            labelId="penitenciaria"
                            id="penitenciaria"
                            multiple
                            size='small'
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Penitenciaria" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField id="outlined-basic" type='date'  size='small'  label="Fecha inicial" variant="outlined" fullWidth
                               value='dd/mm/yyyy'/>

                    <TextField id="outlined-basic" type='date'  size='small'  label="Fecha final" variant="outlined" fullWidth
                               value='mm/dd/yyyy'/>

                    <Stack spacing={2} sx={{minWidth: '250px'}} direction='row'>
                        <Button fullWidth size='small' variant="contained"  >
                            Filtrar
                        </Button>

                        <Button fullWidth variant="outlined"  size='small'    href='/informes/ingresos/reporte' >
                            Generar PDF
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Paper>

    )
}