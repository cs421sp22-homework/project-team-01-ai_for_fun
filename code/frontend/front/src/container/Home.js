import React, { Fragment, PureComponent } from "react";
import { Redirect } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import image from './homepage_image/image.png';
import image1 from './homepage_image/image1.png';
import image2 from './homepage_image/image2.png';
import image3 from './homepage_image/image3.png';
import image4 from './homepage_image/image4.png';
import TabNav from "./TabNav";
import Tab from "./Tab";
import Slideshow from "../components/Slideshow";
import {Row, Col, Button, Form} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import "../style/Home.css";

const tempimage = [
    { imgUrl: './img/01.png', name: '01', topic: 'Star' },
    { imgUrl: './img/02.png', name: '02', topic: 'House' },
    { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '06', topic: 'Face' },
    { imgUrl: './img/07.png', name: '07', topic: 'Good' },
]

export class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     selected: '❤️  For you ❤️'
        // }
    }

    setSelected = (tab) => {
        this.setState({ selected: tab });
    }

    render() {
        return (
            <>
                <div
                    className='p-5 bg-image'
                    style={{ backgroundImage: "url('https://media.istockphoto.com/photos/abstract-background-white-light-blue-purple-color-gradient-defocused-picture-id1303182525?b=1&k=20&m=1303182525&s=170667a&w=0&h=CcoMiovEh6X8KCTj6HZMVYLSxoBr_oUozr4jrZy4-_s=')" }}
                    >
                    <div className='mask'>
                    <div className='d-flex justify-content-center align-items-center h-100 text-center'>
                        <div className='text-white'>
                        {/* <h1 className='mt-5'>AI For Fun</h1>
                        <h4 className='mt-1'>This is an application</h4> */}
                        <h1 className='mb-3'>AI For Fun</h1>
                        <h4 className='mb-3'>This is an application</h4>
                        <a className='btn btn-outline-dark btn-lg' href='#!' role='button'>
                            Get Start
                        </a>
                        </div>
                    </div>
                    </div>
                    {/* <Tabs  defaultActiveKey="foryou" id="uncontrolled-tab-example" className="mb-3 test">
                    <Tab eventKey="foryou" title="For you">
                        <div className="mt-5">
                        <Slideshow imgData={tempimage}/>
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        gap
                    </Tab>
                    <Tab eventKey="contact" title="Contact">
                    <div className="mt-5">
                        <Slideshow imgData={tempimage}/>
                        </div>
                    </Tab>
                </Tabs> */}
                </div>
            <Container fluid>    
                {/* <Row>
                    <Col lg={1}></Col>

                    <Col lg={2}>
                        <NavLink to="/account" className='home-button center'><a href="" className="logo"><img className="logo" src={image} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">For you</p>
                    </Col>

                    <Col lg={2}>
                        <NavLink to="/account" className='home-button center'><a href="" className="logo"><img className="logo" src={image1} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">Trend</p>
                    </Col>

                    <Col lg={2}>
                        <NavLink to="/AI_face" className='home-button center'><a href="" className="logo"><img className="logo" src={image2} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">AI Face</p>
                    </Col>

                    <Col lg={2}>
                        <NavLink to="/AI_vedio" className='home-button center'><a href="" className="logo"><img className="logo" src={image3} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">AI Vedio</p>
                    </Col>

                    <Col lg={2}>
                        <NavLink to="/AI_text" className='home-button center'><a href="" className="logo"><img className="logo" src={image4} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">AI Text</p>
                    </Col>
                </Row> */}

                {/* <div className="App mt-4">
                    <TabNav tabs={['❤️  For you ❤️', '🔥 Trend 🔥', '🥀 AI face 🥀', '🎧  AI vedio 🎧', '🎵 AI text 🎵']} selected={this.state.selected} setSelected={this.setSelected}>
                        <Tab isSelected={this.state.selected === '❤️  For you ❤️'}>

                        </Tab>
                        <Tab isSelected={this.state.selected === '🔥 Trend 🔥'}>
                            <Slideshow imgData={tempimage}/>
                        </Tab>
                        <Tab isSelected={this.state.selected === '🥀 AI face 🥀'}>
                            <p> hello this is what is a AI model1</p>
                        </Tab>
                        <Tab isSelected={this.state.selected === '🎧  AI vedio 🎧'}>
                            <p> hello this is what is a AI model2</p>
                        </Tab>
                        <Tab isSelected={this.state.selected === '🎵 AI text 🎵'}>
                            <p> hello this is what is a AI model3</p>
                        </Tab>
                    </TabNav>
                </div> */}
                 <Tabs  defaultActiveKey="foryou" id="uncontrolled-tab-example">
                    <Tab eventKey="foryou" title="For you">
                        <div className="mt-3">
                        <Slideshow imgData={tempimage}/>
                        </div>
                    </Tab>
                    <Tab eventKey="trend" title="Trend">
                    <div className="mt-3">
                        <Slideshow imgData={tempimage}/>
                        </div>
                    </Tab>
                    <Tab eventKey="face" title="Face">
                    <div className="mt-3">
                        <Slideshow imgData={tempimage}/>
                        </div>
                    </Tab>
                </Tabs>
            </Container>
            </>
        );
    }

};
export default Home;