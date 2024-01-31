import * as React from 'react'
import {Box, Paper} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LaunchIcon from '@mui/icons-material/Launch';
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";


export default function TabDatosPersonales() {
    const [value, setValue] = React.useState('1');


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Box mt={3}>
            <Paper elevation={1}>
                <Box>
                    {/* Tabs*/}

                    <TabContext value={value}  aria-orientation='vertical'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab  label="Causas" value="1" />
                                <Tab label="Audiencias" value="2" />
                                <Tab label="Libertades" value="3" />
                            </TabList>
                        </Box>
                        <Box>
                            <TabPanel value="1" sx={{p:'0'}}>
                                <Box>
                                    <Box p={3}>
                                        <FiltrosTables/>
                                    </Box>
                                    <CustomTable showId={true}/>
                                </Box>
                            </TabPanel>
                            {/*<TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>*/}
                        </Box>

                    </TabContext>


                </Box>
            </Paper>
        </Box>
    )
}