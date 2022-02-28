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
import Slideshow from "./Slideshow"
// import ColorTabs from "./tab";

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '❤️  For you ❤️'
        }
    }

    setSelected = (tab) => {
        this.setState({ selected: tab });
    }

    render() {
        return (
            <div className={'container'}>
                <header className={'text-center text-black py-5'}>
                    <h1 className={'display-4 font-weight-bold mb-4'}>AI For Fun</h1>
                    <p>This is an applicaiton that would like to implement AI model in human face, for bring fun exprience to you.</p>
                </header>

                <div className={'row'}>
                    <div className={'col-lg-1'}></div>

                    <div className={'col-lg-2'}>
                        <NavLink to="/account" className='home-button center'><a href="" className="logo"><img className="logo" src={image} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">For you</p>
                    </div>

                    <div className={'col-lg-2'}>
                        <NavLink to="/account" className='home-button center'><a href="" className="logo"><img className="logo" src={image1} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">Trend</p>
                    </div>

                    <div className={'col-lg-2'}>
                        <NavLink to="/AI_face" className='home-button center'><a href="" className="logo"><img className="logo" src={image2} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">AI Face</p>
                    </div>

                    <div className={'col-lg-2'}>
                        <NavLink to="/AI_vedio" className='home-button center'><a href="" className="logo"><img className="logo" src={image3} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">AI Vedio</p>
                    </div>

                    <div className={'col-lg-2'}>
                        <NavLink to="/AI_text" className='home-button center'><a href="" className="logo"><img className="logo" src={image4} alt="" /></a>
                        </NavLink>
                        <p className="text-center display:block">AI Text</p>
                    </div>
                </div>

                <div className="App mt-4">
                    <TabNav tabs={['❤️  For you ❤️', '🔥 Trend 🔥', '🥀 AI face 🥀', '🎧  AI vedio 🎧', '🎵 AI text 🎵']} selected={this.state.selected} setSelected={this.setSelected}>
                        <Tab isSelected={this.state.selected === '❤️  For you ❤️'}>
                            {/* <Slideshow imgData={image} /> */}
                        </Tab>
                        <Tab isSelected={this.state.selected === '🔥 Trend 🔥'}>
                            <p> hello this is what is populate nowdays</p>
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
                </div>
            </div>
        );
    }

};
export default Home;