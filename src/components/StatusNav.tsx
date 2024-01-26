'use client'
import {Breadcrumbs, Link, Typography} from "@mui/material";
import {usePathname} from "next/navigation";
import styles from "./StatusNav.module.css";

export default function StatusNav({lastItem}: { lastItem: string }) {

    // console.log({lastItem})
    const pathName = usePathname();
    const nameList = pathName.split('/').filter(Boolean); // Filtra elementos vacíos

    // Construye el path completo para cada breadcrumb
    const getPath = (index: number) => {
        return '/' + nameList.slice(0, index + 1).join('/');
    };

    return (
        <Breadcrumbs aria-label="breadcrumbs" className={styles.breadcrumbs}>
            {/* Elemento Inicio */}
            <Link className={styles.link} underline="hover" href="/inicio">
                Inicio
            </Link>

            {nameList.map((name, index) => {
                // Si es el último elemento, no es clickeable
                if (index === nameList.length - 1) {
                    return <Typography key={index} color="text.primary"
                                       textTransform='capitalize'>{lastItem}</Typography>;
                }

                return (
                    <Link
                        className={styles.link}
                        textTransform='capitalize'
                        key={index}
                        underline="hover"
                        href={getPath(index)}
                    >
                        {name}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}
