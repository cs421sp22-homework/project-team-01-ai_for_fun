import React, { Component } from "react";
import ReactAudioPlayer from 'react-audio-player';

class MediaComponent extends Component {

    render() {
        return (
            <ReactAudioPlayer
                src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
                autoPlay
                controls
            />
        );
    }
}
export default MediaComponent;