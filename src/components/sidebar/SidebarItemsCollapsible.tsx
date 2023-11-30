'use client'

import React from "react";
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {ExpandLess, ExpandMore} from "@mui/icons-material";


const SidebarItemsCollapsible = ({ label, Icon, open, toggle, children }) => {
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
