import { FC, forwardRef } from "react";

import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps{
  
}

const VideoPlayer = forwardRef(function (props, ref){
  return(
    <canvas id="player"  className={styles.player}></canvas>
  )
})

export default VideoPlayer;