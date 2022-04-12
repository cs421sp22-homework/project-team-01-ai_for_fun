import React, { Component } from "react";
import ReactAudioPlayer from 'react-audio-player';

class MediaComponent extends Component {

    render() {
        return (
            <ReactAudioPlayer
                src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
                loop="false"
                controls
                volume="0.5"
            />
        );
    }
}
export default MediaComponent;