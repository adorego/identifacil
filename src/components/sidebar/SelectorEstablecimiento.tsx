import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import * as React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {useEffect} from "react";
import {fetchData} from "@/components/utils/utils";
import {useGlobalContext} from "@/app/Context/store";

const SelectorEstablecimiento = ({open}:{open:boolean}) =>{

    const { selectedEstablecimiento, setSelectedEstablecimiento } = useGlobalContext();
    const [state, setState] = React.useState<
        {
            selectedID: string,
            establecimientos:{
                id: string,
                nombre: string
            }[]
        }>(
        {
            selectedID: '0',
            establecimientos:[]
        });

    useEffect(() => {

        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_JSON_SERVER}/establecimientos/`;
        fetchData(url)
            .then(fetchedData => {

                setState(prevState => {
                    return {
                        ...prevState,
                        establecimientos: [...fetchedData]

                    }
                });
            });
    }, []);


    const handleChange = (event: SelectChangeEvent) => {
        setSelectedEstablecimiento(event.target.value as string)
        setState(prevState => {
            return{
                ...prevState,
                selectedID: event.target.value as string,

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
                            <MenuItem value={'0'}>Todas</MenuItem>
                            {
                                state.establecimientos.map(item=>(
                                        <MenuItem key={item.id} value={`${item.id}`}>{item.nombre}</MenuItem>
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