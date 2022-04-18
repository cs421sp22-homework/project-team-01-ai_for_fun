import React from "react";
import Tab from "react-bootstrap/Tab";
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Amplify, { Storage } from 'aws-amplify'
import config from '../aws-exports'
import HomeDisplay from "./HomeDisplay";
import Cards from "./Cards"
import TopicCards from "./TopicCard"
import Footer from "../components/Footer";
import "../style/Home.css";
Amplify.configure(config)

export class Home extends React.Component {
    render() {
        return (
            <>
                <HomeDisplay />
                <Container fluid>
                    <Tabs defaultActiveKey="foryou" id="uncontrolled-tab-example" size="Large">
                        <Tab eventKey="foryou" title="For you" >
                            <div className="mt-3">
                                <Cards />
                            </div>
                        </Tab>
                        <Tab eventKey="trend" title="Trend">
                            <div className="mt-3">
                                <Cards />
                            </div>
                        </Tab>
                        <Tab eventKey="face" title="Face">
                            <div className="mt-3">
                                <TopicCards info={faceTopic} />
                            </div>
                        </Tab>
                        <Tab eventKey="Voice" title="Voice">
                            <div className="mt-3">
                                <TopicCards info={voiceTopic} />
                            </div>
                        </Tab>

                        <Tab eventKey="Style" title="Style">
                            <div className="mt-3">
                                <TopicCards info={styleTopic} />
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
                <Footer />
            </>
        );
    }
};
export default Home;

const faceTopic = [
    { src: "images/AI_face_movie_start_leonardo.jpeg" },
    { src: "images/AI_face_movie_start_jolie.jpeg" },
    { src: "images/AI_face_singer_selena.jpeg" },
    { src: "images/AI_face_singer_taylor.jpeg" },
    { src: "images/AI_face_thrones_Kit.webp" },
    { src: "images/AI_face_friend_matt.jpeg" }
]

const voiceTopic = [
    { src: "images/AI_voice_mickey_mouse.jpg" },
    { src: "images/AI_voice_minnie_mouse.jpg" },
    { src: "images/AI_voice_goofy.jpg" },
    { src: "images/AI_voice_donald_duck.jpeg" },
    { src: "images/AI_voice_daisy_duck.webp" },
    { src: "images/AI_voice_ludwig_von_drake.jpeg" }
]

const styleTopic = [
    { src: "images/AI_style_van_gogh_1.jpeg" },
    { src: "images/AI_style_van_gogh_Wheat Field with Cypresses The Metropolitan Museum of Art.jpeg" },
    { src: "images/AI_style_raffaello_The Deposition.jpeg" },
    { src: "images/AI_style_raffaello_The Parnassus.jpeg" },
    { src: "images/AI_style_chinese_1.jpeg" },
    { src: "images/AI_style_chinese_2.webp" }
]