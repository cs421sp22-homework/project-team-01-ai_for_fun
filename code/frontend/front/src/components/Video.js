import React from "react";
import VideoPlayer from 'react-video-js-player';
import {Player} from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import ReactPlayer from 'react-player'

function Video(props) {
    const info = props.props;
    const urlSrc = info.videoSrc;
    const poster = info.poster;
    return(
        <div className="video" style={{ maxHeight: '90vw' }}>
            <Player
               src={urlSrc}
               poster={poster}
               fluid = {true}
            >
            </Player>
            {/* <ReactPlayer url={urlSrc}
            width="100%"
            height="100%"
            controls={true}
            /> */}
        </div>
    )
}
export default Video;

