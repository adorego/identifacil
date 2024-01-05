import * as React from 'react'
import {Box, Paper} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from "next/link";
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";


export default function TabDatosPersonales(){
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return(
        <Box mt={3}>
            <Paper elevation={1}>
                <Box >
                    {/* Tabs*/}

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="icon position tabs example"
                    >
                        <Link href='/datos-penales/causas'>
                            <Tab icon={<LaunchIcon />} iconPosition="end" label="Causas" />
                        </Link>
                        <Link href='/datos-penales/audiencias'>
                            <Tab icon={<LaunchIcon />} iconPosition="end" label="Audiencias" />
                        </Link>
                        <Link href='/datos-penales/libertades'>
                            <Tab icon={<LaunchIcon />} iconPosition="end" label="Libertades" />
                        </Link>

                    </Tabs>
                    <Box>
                        <Box p={3}>
                            <FiltrosTables/>
                        </Box>
                        <CustomTable showId={true}/>
                    </Box>

                </Box>
            </Paper>
        </Box>
    )
}