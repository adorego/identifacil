import * as React from "react";

import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {SelectChangeEvent} from "@mui/material/Select";
import {fetchData} from "@/components/utils/utils";
import {useEffect} from "react";
import {useGlobalContext} from "@/app/Context/store";

const SelectorEstablecimiento = ({open}:{open:boolean}) =>{

    const { setSelectedEstablecimiento,selectedEstablecimiento } = useGlobalContext();
    const [state, setState] = React.useState<
        {
            selectedID: number,
            establecimientos:{
                id: number,
                nombre: string
            }[]
        }>(
        {
            selectedID: 1,
            establecimientos:[]
        });

    useEffect(() => {

        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/establecimientos/`;
        fetchData(url)
            .then(fetchedData => {
                setSelectedEstablecimiento(1)
                setState(prevState => {
                    return {
                        ...prevState,
                        establecimientos: fetchedData ? [...fetchedData.establecimientos] : [],
                        selectedID: 1,

                    }
                });
            });
    }, []);


    const handleChange = (event: SelectChangeEvent<number>) => {
        setSelectedEstablecimiento(event.target.value as number)
        setState(prevState => {
            return{
                ...prevState,
                selectedID: event.target.value as number,

            }
        });
    };

    /*if (!state) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <CircularProgress />
            </Box>
        );
    }*/
    return(
        <>

            <Box sx={{p: '20px'}}>
                <FormControl fullWidth>
                    <InputLabel id="establecimiento">Establecimiento penitenciario</InputLabel>
                    {open ? <Select
                            labelId="establecimiento"
                            id="establecimiento"
                            name="establecimiento"
                            value={state.selectedID}
                            label="Establecimiento penitenciario"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Todas</MenuItem>
                            {
                                state.establecimientos.map(item=>(
                                        <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem>
                                    )
                                )
                            }


                        </Select>
                        : ''
                    }

                </FormControl>
            </Box>
        </>
    )
}

export default SelectorEstablecimiento;