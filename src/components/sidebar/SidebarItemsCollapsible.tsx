'use client'

import React, { ReactNode } from 'react';
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    List,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { SvgIconComponent } from '@mui/icons-material';

interface SidebarItemsCollapsibleProps {
    label: string;
    Icon: SvgIconComponent; // Asegúrate de definir el tipo para Icon correctamente
    open: boolean;
    toggle: () => void;
    children: ReactNode;
}
const SidebarItemsCollapsible: React.FC<SidebarItemsCollapsibleProps> = ({
                                                                             label,
                                                                             Icon,
                                                                             open,
                                                                             toggle,
                                                                             children,
                                                                         }) => {
    return (
        <>
            <ListItemButton onClick={toggle}>
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText primary={label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </>
    );
};
export default SidebarItemsCollapsible;
