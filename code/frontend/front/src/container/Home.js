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
                <HomeDisplay/>
                <Container fluid>
                    <Tabs defaultActiveKey="foryou" id="uncontrolled-tab-example">
                        <Tab eventKey="foryou" title="For you">
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
                                <TopicCards info={faceTopic}/>
                            </div>
                        </Tab>
                        <Tab eventKey="Voice" title="Voice">
                            <div className="mt-3">
                                <TopicCards info={voiceTopic}/>
                            </div>
                        </Tab>

                        <Tab eventKey="Style" title="Style">
                            <div className="mt-3">
                                <TopicCards info={styleTopic}/>
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
                <Footer/>
            </>
        );
    }
};
export default Home;

const faceTopic = [
    {src:"images/AI_face_movie_start_leonardo.jpeg",path:"/AI_face",label:"movie star",text:"Leonardo DiCaprio. Exchange face with one of the most famous actors in the world."},
    {src:"images/AI_face_movie_start_jolie.jpeg",path:"/AI_face",label:"movie star",text:"Exchange face with Angelina Jolie, who has been named Hollywood's highest-paid actress multiple times."},
    {src:"images/AI_face_singer_selena.jpeg",path:"/AI_face",label:"singer",text:"Selena. Exchange face with one of the most famous singer in the world."},
    {src:"images/AI_face_singer_taylor.jpeg",path:"/AI_face",label:"singer",text:"Taylor Swift, one of the best artists of our time. Exchange face with Taylor."},
    {src:"images/AI_face_thrones_Kit.webp",path:"/AI_face",label:"thrones",text:"The winter is coming, Exchange face with Kit in Game of thrones."},
    {src:"images/AI_face_friend_matt.jpeg",path:"/AI_face",label:"friend",text:"Every body loves matt, exchange face with your favorite movie star."}
]

const voiceTopic = [
    {src:"images/AI_voice_mickey_mouse.jpg",path:"/AI_text",label:"mickey_mouse",text:"Let Mickey mouse say what you want to hear"},
    {src:"images/AI_voice_minnie_mouse.jpg",path:"/AI_text",label:"minnie_mouse",text:"Minnie mouse want to talk with you"},
    {src:"images/AI_voice_goofy.jpg",path:"/AI_text",label:"goofy",text:"Goofy is going to say its classic sayings"},
    {src:"images/AI_voice_donald_duck.jpeg",path:"/AI_text",label:"donald_duck",text:"Donald duck will read a story for you"},
    {src:"images/AI_voice_daisy_duck.webp",path:"/AI_text",label:"daisy_duck",text:"Daisy duck is ready to speak"},
    {src:"images/AI_voice_ludwig_von_drake.jpeg",path:"/AI_text",label:"ludwig_von_drake",text:"ludwig von drake want to talk with you"}
]

const styleTopic = [
    {src:"images/AI_style_van_gogh_1.jpeg",path:"/AI_style",label:"van",text:"Make your images resemble van Gogh's starry sky"},
    {src:"images/AI_style_van_gogh_Wheat Field with Cypresses The Metropolitan Museum of Art.jpeg",path:"/AI_style",label:"van",text:"Exchange the style of your photo with one of the most famous paintings in the world--Wheat Field with Cypresses."},
    {src:"images/AI_style_raffaello_The Deposition.jpeg",path:"/AI_style",label:"raffaello",text:"Make your photo looks like Raphael's The Deposition."},
    {src:"images/AI_style_raffaello_The Parnassus.jpeg",path:"/AI_style",label:"raffaello",text:"Make your photo looks like Raphael's The Parnassus."},
    {src:"images/AI_style_chinese_1.jpeg",path:"/AI_style",label:"chinese",text:"Generate ancient Chinese style pictures."},
    {src:"images/AI_style_chinese_2.webp",path:"/AI_style",label:"chinese",text:"Make your pictures look like ancient Chinese relics."}
]
