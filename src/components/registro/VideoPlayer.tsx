import { FC, forwardRef } from "react";

import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps{
  
}

const VideoPlayer = forwardRef(function (props, ref){
  return(
    <canvas id="player"  className={styles.player}></canvas>
  )
})
// Provide a displayName for your component
VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;