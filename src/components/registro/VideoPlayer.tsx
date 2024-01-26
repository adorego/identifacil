import { FC, forwardRef } from "react";

import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps{
  
}

export default function VideoPlayer(){
  return(
    <canvas id="player"  className={styles.player}></canvas>
  )
}

