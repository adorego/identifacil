'use client'

import { Breadcrumbs, Link } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import { Inter } from "next/font/google";
import styles from "./StatusNav.module.css";
import { useEffect } from "react";

const inter = Inter({ 
  subsets: ['latin'],
   

})
export default function StatusNav(){
  const pathName = usePathname();
  const nameList = pathName.split('/');
  useEffect(
    () =>{
      console.log('Current path:', pathName);
    },[pathName]
  )
  return(
    <Breadcrumbs aria-label="breadcrumbs" className={styles.breadcrumbs}>
      {
        nameList.map(
          (name, index) =>{
            return <Link className={styles.link} key={index} underline="hover" href={`/${name}`}>{name}</Link>
          }
        )
      }
    </Breadcrumbs>
  )
}