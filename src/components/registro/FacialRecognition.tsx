'use client'

import 'vimond-replay/index.css';

import { Box, Button, Grid } from "@mui/material"
import { useEffect, useRef, useState } from "react"

import { AddAPhoto } from "@mui/icons-material"
import JsmpegPlayer from "../../common/JsmpegPlayer";
import ReactPlayer from "react-player";
import {Replay} from "vimond-replay";
import styles from "./FacialRecognition.module.css";

const videoOptions = {
  autoplay:true,
  


};

const videoOverlayOptions = {};

export default function FacialRecognition(){
  const wsVideo = useRef<string>("");
  let jsmpegPlayer = null;
  
  useEffect(() =>{
    
    const streamWebSocketUrl = `${process.env.NEXT_PUBLIC_CAMARA_STREAMING_WEBSOCKET_URL}`
    const streamRtspUrl = `${process.env.NEXT_PUBLIC_CAMARA_STREAMING_RTSP_URL}`;
    const tempUrl = "rtsp://admin:PTKAdmin40@192.168.1.108:554/cam/realmonitor?channel=1&subtype=0";
    fetch('http://127.0.0.1:3000/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({tempUrl} ),
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
          
         {window !== undefined ? 
         <JsmpegPlayer
          wrapperClassName={styles["video-wrapper"]}
          videoUrl={wsVideo.current}
          options={videoOptions}
          overlayOptions={videoOverlayOptions}
          onRef={(ref:any) => jsmpegPlayer = ref}
        /> : null}

        
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