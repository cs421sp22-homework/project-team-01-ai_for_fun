import React from "react";
import Tab from "./Tab";
import Slideshow from "../components/Slideshow";
import Slideshow_voice from "../components/Slideshow_voice";
import Slideshow_style from "../components/Slideshow_style";
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
                                <h4 className='mb-3'>This is an application for best AI experiences</h4>

                                <Button variant="outline-primary" size="lg" href="/AI_face" style={{ marginTop: 20, marginRight: 10 }}>AI Face</Button>{' '}
                                <Button variant="outline-dark" size="lg" href="/AI_text" style={{ marginTop: 20, marginRight: 10 }}>AI Voice</Button>{' '}
                                <Button variant="outline-success" size="lg" href="/AI_style" style={{ marginTop: 20, marginRight: 10 }}>AI Style</Button>{' '}
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
                        <Tab eventKey="Voice" title="Voice">
                            <div className="mt-3">
                                <Slideshow_voice imgData={Voice_img} />
                            </div>
                        </Tab>

                        <Tab eventKey="Style" title="Style">
                            <div className="mt-3">
                                <Slideshow_style imgData={Style_img} />
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

const Style_img = [//{ imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/escher_sphere.jpg?token=GHSAT0AAAAAABRYH3ME5TAYK54BMGQ3JS7KYSWBCRQ', name: '06', topic: 'Style' },
    { imgUrl: 'https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg', name: '24', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/843,/0/default.jpg', name: '25', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/9ea77636-76e9-9031-6b92-ff34512d7cbc/full/843,/0/default.jpg', name: '26', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/d0ff5b36-bb38-b156-6042-5c8545352c2f/full/843,/0/default.jpg', name: '27', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/92827fc4-78a3-a263-75a2-6470eabad38b/full/843,/0/default.jpg', name: '28', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/43fcfad0-8256-4923-9f9c-03ca90417907/full/843,/0/default.jpg', name: '29', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/f11bd233-6cc3-4221-59eb-f7363be4119e/full/843,/0/default.jpg', name: '29', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Claude_Monet_Water_Lilies_1908.jpg/800px-Claude_Monet_Water_Lilies_1908.jpg', name: '29', topic: 'Les Nymphéas' },
    { imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Nympheas_71293_3.jpg/1280px-Nympheas_71293_3.jpg', name: '29', topic: 'Les Nymphéas' },
    { imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Claude_Monet_-_Water-Lilies_%28Bridgestone_Museum%29.jpg', name: '29', topic: 'Les Nymphéas' },
    { imgUrl: 'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NTk4NjgxNjM0NTI3/hith-art-heists-scream-2.jpg', name: '29', topic: 'Style' },
    { imgUrl: 'https://artincontext.org/wp-content/uploads/2021/10/Famous-Portrait-Paintings-848x530.jpg', name: '29', topic: 'Style' },
    { imgUrl: 'https://wallpaperaccess.com/full/2614.jpg', name: '29', topic: 'Style' },
    { imgUrl: 'https://i.pinimg.com/736x/45/45/4c/45454cdf18790c0eaf4390aad5ea04fe.jpg', name: '29', topic: 'Style' },
    { imgUrl: 'https://frenchquest.files.wordpress.com/2014/04/monet-impression-sunrise.jpg', name: '30', topic: 'Style' },
    { imgUrl: 'https://www.discoverlosangeles.com/sites/default/files/images/2019-01/Getty%20Center%20Van%20Gogh%20Irises.jpg', name: '31', topic: 'Style' },
    { imgUrl: 'https://i.pinimg.com/originals/0d/34/f0/0d34f0ffab6ae81e6e60e1293be046a2.jpg', name: '32', topic: 'Style' },
    { imgUrl: 'https://theawesomedaily.com/wp-content/uploads/2016/12/famous-paintings-1-1.jpg', name: '33', topic: 'Style' },
    { imgUrl: 'https://artlogic-res.cloudinary.com/w_1200,h_800,c_fill,f_auto,fl_lossy,q_auto:good/ws-canvasgallery/usr/images/blog_entries/main_image/items/62/624b23f8789441b598e404ea116b41c4/waterlillies-john-myatt.jpg', name: '34', topic: 'Style' },
    { imgUrl: 'https://www.touropia.com/gfx/b/2010/10/the_great_wave_off_kanagawa.jpg', name: '35', topic: 'Style' },
    { imgUrl: 'https://i.insider.com/4ef4ba36eab8eafb64000035?width=600&format=jpeg&auto=webp', name: '36', topic: 'Style' },
    { imgUrl: 'https://el-paso-museum-of-art-production.s3.amazonaws.com/collections/images/000/000/001/optimized/ButlerFireworks.jpg?1516832871', name: '37', topic: 'Style' },
    { imgUrl: 'https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-16.jpg?t=1628119938&', name: '38', topic: 'Style' },
    { imgUrl: 'https://bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-4.jpg', name: '39', topic: 'Style' },
    { imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/1024px-Vincent_Willem_van_Gogh_127.jpg', name: '40', topic: 'Style' },
]

const Voice_img = [
    { imgUrl: 'https://d23.com/app/uploads/2020/05/1180w-600h_060120_mickey-mornings-launch.jpg', name: '1', topic: 'Mickey Mouse' },
    { imgUrl: 'https://www.disneyonice.com/sites/default/files/2020-10/quackers-donald-featured.jpg', name: '2', topic: 'Donald Duck' },
    { imgUrl: 'https://wallpaperaccess.com/full/1258313.jpg', name: '3', topic: 'Minnie Mouse' },
]