'use client'

import React, {FC} from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";


interface SidebarItemProps {
    icon: React.ReactNode; // O React.ReactElement si prefieres ser más específico
    label: string;
    isActive: boolean;
    path: string;
    toggleSidebar?: () => void; // Si toggleSidebar es una función
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, path, isActive, toggleSidebar }) => {
    const router = useRouter();

    const handleNavigation = () => {
        router.push(path);
        if (toggleSidebar) {
            toggleSidebar();
        }
    };

    return (
        /*<Link href={path}>
            MOvimientos2
        </Link>*/
        <Link href={path} className='linkItemButton' prefetch={true}>

            <ListItemButton >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItemButton>

        </Link>

    );
};

export default SidebarItem;
