'use client'

import 'vimond-replay/index.css';

import { Box, Button, Grid } from "@mui/material"
import { useEffect, useRef, useState } from "react"

import { AddAPhoto } from "@mui/icons-material"
import ReactPlayer from "react-player";
import {Replay} from "vimond-replay";
import styles from "./FacialRecognition.module.css";

export default function FacialRecognition(){
  const wsVideo = useRef<string>("");
  
  
  useEffect(() =>{
    
    const streamWebSocketUrl = `${process.env.NEXT_PUBLIC_CAMARA_STREAMING_WEBSOCKET_URL}`
    const streamRtspUrl = `${process.env.NEXT_PUBLIC_CAMARA_STREAMING_RTSP_URL}`;

    fetch(streamWebSocketUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({streamRtspUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.url);
        wsVideo.current = data.url;
        
        
      })
      
  },[])

  return(
    
    <Box sx={{marginBottom:3, paddingBottom:3, border:"1px solid grey"}}>
      <Grid container spacing={0} justifyContent={"center"}>
        <Grid item xs={12}>
         {window !== undefined ? <Replay source={wsVideo.current} /> : null} 
        

        
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" endIcon={<AddAPhoto />}>
            Capturar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}