'use client'

import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import React, { MouseEventHandler, ReactElement, ReactHTMLElement, ReactNode } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface SidebarItemsCollapsibleProps{
    label:string;
    Icon:any;
    open:boolean;
    toggle:(MouseEventHandler<HTMLDivElement>);
    children:ReactNode;
}

const SidebarItemsCollapsible = ({ label, Icon, open, toggle, children }:SidebarItemsCollapsibleProps) => {
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
