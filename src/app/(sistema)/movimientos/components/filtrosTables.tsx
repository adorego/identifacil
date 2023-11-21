import * as React from 'react';
import {FormControl, Grid, InputLabel, MenuItem, TextField} from "@mui/material";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";



export default function FiltrosTables(){
    // Variables para selector de rango de fecha
    const [valueDateStart, setValueDateStart] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [valueDateEnd, setValueDateEnd] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    // Variables para el select
    const [condena, setCondena] = React.useState('');

    const handleChangeCondena = (event: SelectChangeEvent) => {
        setCondena(event.target.value as string);

    };

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Condena</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={condena}
                            label="Condena"
                            onChange={handleChangeCondena}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha inicial"
                            value={valueDateStart}
                            onChange={(newValueDateStart) => setValueDateStart(newValueDateStart)}
                            sx={{
                                width:'100%',
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha Final"
                            value={valueDateEnd}
                            onChange={(newValueDateEnd) => setValueDateEnd(newValueDateEnd)}
                            sx={{
                                width:'100%',
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={5}>
                    <TextField id="outlined-basic" label="Buscar por nombre o numero de ppl"
                               variant="outlined" fullWidth/>
                </Grid>
            </Grid>
        </>
    )
}