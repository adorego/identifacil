import {Breadcrumbs, Link, Typography} from "@mui/material";
import * as React from "react";

export default function BreadCrumbComponent({listaDeItems}:{listaDeItems:Array<any>}){


    return(
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/inicio">
                    Inicio
                </Link>
                {listaDeItems &&
                    (
                        listaDeItems.map((item: any,index:number) => {

                            if(!item.lastItem){
                                return (

                                        <Link underline="hover" color="inherit" href={item.url} key={index}>
                                            {item.nombre}
                                        </Link>

                                )
                            }else{
                                return (
                                    <div key={index}>
                                        <Typography color="text.primary"> {item.nombre}</Typography>
                                    </div>
                                )
                            }
                        })
                    )
                }
            </Breadcrumbs>
        </>
    )
}