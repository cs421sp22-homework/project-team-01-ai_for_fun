import React from "react";
import Tab from "./Tab";
import Slideshow from "../components/Slideshow";
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import { ToggleButton, ToggleButtonGroup, ButtonGroup, Button } from 'react-bootstrap';
import "../style/Home.css";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import AWS from "aws-sdk";
import Amplify, { Storage } from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

//topic: Singers, Game of Thrones, Meme, Face, Friends, Movie Stars, Vedio
const Trendflow = [];
const Foryouflow = [];
const Faceflow = [];
//var AWS = require('aws-sdk/dist/aws-sdk-react-native');
//console.log(AWS);

// https://server-demo.ai-for-fun-backend.com/getentities

export class Home extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     selected: '❤️  For you ❤️'
        // }
        this.state = {
            totalReactPackages: null,
            errorMessage: null
        };
        this.Trendflow = Trendflow;
    }

    setSelected = (tab) => {
        this.setState({ selected: tab });
    }

    componentDidMount = async () => {
        // const result = await Storage.list();
        // console.log(result)

        const signedURL = await Storage.get('1eZnePwSETNSdNaT.jpg');
        console.log(signedURL);

        const response = await fetch("https://server-demo.ai-for-fun-backend.com/getentities", {
            method: 'POST',
        });
        if (response.ok) {
            const content = await response.json();
            for (var i = 0; i < content.length; i++) {
                if (content[i]._id.mode === 'styleflow') {
                    for (var j = 0; j < content[i].entities.length; j++) {
                        Trendflow.push(content[i].entities[j].imagename);
                    }
                }
            }
            console.log(Trendflow);
            // alert("Success!")
        }
        else {
            console.log('request failed for get entities', response);
        }


    }

    render() {
        const { errorMessage, totalReactPackages } = this.state;
        return (
            <>
                <div
                    className='p-5 bg-image'
                    style={{ backgroundImage: "url('https://media.istockphoto.com/photos/abstract-background-white-light-blue-purple-color-gradient-defocused-picture-id1303182525?b=1&k=20&m=1303182525&s=170667a&w=0&h=CcoMiovEh6X8KCTj6HZMVYLSxoBr_oUozr4jrZy4-_s=')" }}
                >
                    <div className='mask'>
                        <div className='d-flex justify-content-center align-items-center h-100 text-center'>
                            <div className='text-white'>
                                <h1 className='mb-3'>AI For Fun</h1>
                                <h4 className='mb-3'>This is an application for best AI experience</h4>
                                {/* <h4>{totalReactPackages}</h4> */}
                                {/* <a className='btn btn-outline-dark btn-lg' href='/AI_face' role='button'>
                                    Get Start
                                </a> */}

                                <Button variant="outline-primary" size="lg" href="/AI_face">AI Face</Button>{' '}
                                <Button variant="outline-dark" size="lg" href="/AI_text">AI Voice</Button>{' '}
                                <Button variant="outline-success" size="lg" href="#">AI Style</Button>{' '}
                            </div>
                        </div>
                    </div>
                </div>
                <Container fluid>
                    <Tabs defaultActiveKey="foryou" id="uncontrolled-tab-example">
                        <Tab eventKey="foryou" title="For you">
                            <div className="mt-3">
                                <Slideshow imgData={tempimage_ForYou} />
                            </div>
                        </Tab>
                        <Tab eventKey="trend" title="Trend">
                            <div className="mt-3">
                                <Slideshow imgData={tempimage_Trend} />
                            </div>
                        </Tab>
                        <Tab eventKey="face" title="Face">
                            <div className="mt-3">
                                <Slideshow imgData={tempimage_Face} />
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
            </>
        );
    }

};
export default Home;

const tempimage_ForYou = [
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg', name: 'movieStart_1', topic: 'Movie Stars' },
    { imgUrl: 'https://media1.popsugar-assets.com/files/thumbor/0ebv7kCHr0T-_O3RfQuBoYmUg1k/475x60:1974x1559/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg', name: 'singers_1', topic: 'Singers' },
    { imgUrl: 'https://www.filmcompanion.in/wp-content/uploads/2020/07/film-comapnion-Joey-Lead-2.jpg', name: 'friends_1', topic: 'Friends' },
    { imgUrl: 'https://cdn.vox-cdn.com/thumbor/84BoAJ5wM2CSqDoaTOZNBnPDU4U=/0x0:2040x1360/1200x675/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/63940677/jbareham_190520_0907_got_0004.0.jpg', name: '04', topic: 'Game of Thrones' },
    { imgUrl: 'https://www.researchgate.net/profile/Giulia-Bini/publication/331639939/figure/fig2/AS:734865725063171@1552217050976/Template-and-propagation-of-the-Success-Kid-meme-source-Google-search-Sept-18.jpg', name: 'meme_01', topic: 'Meme' },
]

const tempimage_Trend = [
    { imgUrl: 'https://media1.popsugar-assets.com/files/thumbor/0ebv7kCHr0T-_O3RfQuBoYmUg1k/475x60:1974x1559/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg', name: 'singers_1', topic: 'Singers' },
    { imgUrl: 'https://cdn.vox-cdn.com/thumbor/84BoAJ5wM2CSqDoaTOZNBnPDU4U=/0x0:2040x1360/1200x675/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/63940677/jbareham_190520_0907_got_0004.0.jpg', name: '04', topic: 'Game of Thrones' },
    { imgUrl: 'https://www.researchgate.net/profile/Giulia-Bini/publication/331639939/figure/fig2/AS:734865725063171@1552217050976/Template-and-propagation-of-the-Success-Kid-meme-source-Google-search-Sept-18.jpg', name: 'meme_01', topic: 'Meme' },
    { imgUrl: 'https://img-9gag-fun.9cache.com/photo/agA21oW_460s.jpg', name: '06', topic: 'Face' },
    { imgUrl: 'https://www.filmcompanion.in/wp-content/uploads/2020/07/film-comapnion-Joey-Lead-2.jpg', name: 'friends_1', topic: 'Friends' },
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg', name: 'movieStart_1', topic: 'Movie Stars' },
    { imgUrl: 'https://cdn.vox-cdn.com/thumbor/6tDpDw_t5UhkGyU3pMLcPjvudD0=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/12861241/acastro_180403_1777_youtube_0002.0.jpg', name: '07', topic: 'Vedio Model' },
]

const tempimage_Face = [
    { imgUrl: 'https://img-9gag-fun.9cache.com/photo/agA21oW_460s.jpg', name: '06', topic: 'Face' },
    { imgUrl: 'https://www.filmcompanion.in/wp-content/uploads/2020/07/film-comapnion-Joey-Lead-2.jpg', name: 'friends_1', topic: 'Friends' },
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg', name: 'movieStart_1', topic: 'Movie Stars' },
    { imgUrl: 'https://cdn.vox-cdn.com/thumbor/84BoAJ5wM2CSqDoaTOZNBnPDU4U=/0x0:2040x1360/1200x675/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/63940677/jbareham_190520_0907_got_0004.0.jpg', name: '04', topic: 'Game of Thrones' },
]