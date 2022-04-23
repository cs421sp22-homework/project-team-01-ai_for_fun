import React, { Fragment, useState, PureComponent } from "react";
import SlideshowInMode from "../components/recommend-in-mode/SlideshowInMode";
import EditVideo from './EditVideo';
import '../style/Slideshow.css';
import '../style/sider.css';
// import UploadFile from "../components/UploadFile";
// import FaceResult from "../components/FaceResult";
// import Card from 'react-bootstrap/Card'
// import UploadPic from '../components/UploadPic';
// import ReactDOM from 'react-dom';
// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Slideshow from "../components/Slideshow";
// import SlidesShowInLeft from "../components/recommend-in-mode/SlidesShowInLeft";
// import CollectionInLeft from "../components/recommend-in-mode/CollectionInLeft";
// import Video from '../components/Video';
// import UploadFace from '../components/UploadFace';


import { Layout, Menu, Breadcrumb } from 'antd';
import {
    UserOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    MailOutlined

} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const tempvideo = {
    videoSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}



const componentDidMount = async () => {
    const response = await fetch("https://server-demo.ai-for-fun-backend.com/getentities", {
        method: 'POST',
    });
    if (response.ok) {
        const content = await response.json();
        for (var i = 0; i < content.length; i++) {
            if (content[i]._id.mode === 'Face_Singers') {
                for (var j = 0; j < content[i].entities.length; j++) {
                    Face_Singers.push(content[i].entities[j]._id);
                }
            }
        }
        console.log(Face_Singers);
        // alert("Success!")
    }
    else {
        console.log('request failed for get entities', response);
    }
}

export const AI_face = () => {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        console.log(collapsed);
        if (collapsed) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    };

    return (
        <>
            <Layout hasSider style={{ marginTop: 70 }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}
                    theme="dark" width='30%' collapsedWidth='5%'
                    style={{
                        height: 'auto',
                        width: '100%',
                        // overflow: 'auto',
                        // position: 'fixed',
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}>
                        <SubMenu key="sub1" icon={<UserAddOutlined />} title="Singers">
                            <SlideshowInMode imgData={Face_Singers} />
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UserDeleteOutlined />} title="Meme">
                            <SlideshowInMode imgData={Face_Meme} />
                        </SubMenu>
                        <SubMenu key="sub3" icon={<UserOutlined />} title="Moive Star">
                            <SlideshowInMode imgData={Movie} />
                        </SubMenu>
                        <SubMenu key="sub4" icon={<UsergroupAddOutlined />} title="Friends Meme">
                            <SlideshowInMode imgData={Friends} />
                        </SubMenu>
                        <SubMenu key="sub1" icon={<UserAddOutlined />} title="President">
                            <SlideshowInMode imgData={President} />
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UserDeleteOutlined />} title="Game of Thrones">
                            <SlideshowInMode imgData={Game_of_Thrones} />
                        </SubMenu>
                        <SubMenu key="sub3" icon={<UserOutlined />} title="Harry Potter">
                            <SlideshowInMode imgData={Harry_Potter} />
                        </SubMenu>
                        <SubMenu key="sub3" icon={<UserOutlined />} title="Marvel">
                            <SlideshowInMode imgData={Marvel} />
                        </SubMenu>
                    </Menu>
                </Sider>

                <Layout className="site-layout" style={{ marginLeft: 0 }}>
                    <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center', background: '#f0f0f0' }} > <h2>AI FACE</h2></Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                            <EditVideo imgData={tempimage} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

const tempimage = [
    { imgUrl: 'https://s1.r29static.com/bin/entry/43a/0,200,2000,2000/x,80/1536749/image.jpg', name: '01', topic: 'Star' },
    { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://stylesatlife.com/wp-content/uploads/2021/11/Emma-Watson-face-shape.jpg.webp', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://c4.wallpaperflare.com/wallpaper/485/848/917/actresses-mckenna-grace-actress-blonde-blue-eyes-hd-wallpaper-preview.jpg', name: '05', topic: 'Fashion' },
]
const Face_Singers = [
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdA_-rNSScGyaVKRkA7FkHsjVlbxjIYihtYA&usqp=CAU', name: '01', topic: 'Star' },
    { imgUrl: 'data:image/jpeg;base64,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', name: '02', topic: 'House' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5FbK5cYcUxvmo7Of1VS7K4PrHNXWIpL-xTQ&usqp=CAU', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1qbk5DdWrBQ7GTegjZ_5bJpr-J8l3o2wlTw&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlbYB7DxCZwteEaHnLHIw4WWKaoZoCH_RKTA&usqp=CAU', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9v0ICFWny_eh_HBw7yw4p44nVYOboJIXpIQ&usqp=CAU', name: '06', topic: 'Face' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWS2o9Xhju8jsP3zCwsas--mqZYvwaAQFMww&usqp=CAU', name: '07', topic: 'Good' },
];
const Face_GOT = [
    { imgUrl: './img/01.png', name: '01', topic: 'Star' },
    { imgUrl: './img/02.png', name: '02', topic: 'House' },
    { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '06', topic: 'Face' },
    { imgUrl: './img/07.png', name: '07', topic: 'Good' },
];
const Face_Meme = [
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTehUF4TMPXq4SQl7Q7wBpdA3xcJgemteYx0w&usqp=CAU', name: 'meme_01', topic: 'Star' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqhAQBMNMwl6bAhZ4XapoYXPGAqnQdh_ZKLA&usqp=CAU', name: 'meme_02', topic: 'House' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtP21VeYsM2-brbdMVppIsS8HQ5UfiZxDfQg&usqp=CAU', name: 'meme_03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKS5w4ofrL3jGVI1-o1wcfFC7FMzJ64oWWFg&usqp=CAU', name: 'meme_04', topic: 'Amazing' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ74l3eSS-cqR5RdNSD_2SH5S3t6DX3JHCuqQ&usqp=CAU', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuMzoVpJ1O9tRNwKq32s5d7F3QTImE_-0eQ&usqp=CAU', name: '06', topic: 'Face' },
];
const Face = [
    { imgUrl: './img/01.png', name: '01', topic: 'Star' },
    { imgUrl: './img/02.png', name: '02', topic: 'House' },
    { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '06', topic: 'Face' },
    { imgUrl: './img/07.png', name: '07', topic: 'Good' },
];
const Friends = [
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLysfblilvBqTDNXvMILLekdjUW2-PsEKtg&usqp=CAU', name: '01', topic: 'Star' },
    { imgUrl: 'https://d207ibygpg2z1x.cloudfront.net/image/upload/v1541181492/articles_upload/content/nsafehc82lfmkwroe1tg.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://www.irishexaminer.com/cms_media/module_img/4972/2486069_10_seoimage1x1_E2jArIRWUAM-0jT.jpg', name: '03', topic: 'New Year' },
    { imgUrl: 'https://static3.srcdn.com/wordpress/wp-content/uploads/2019/08/Joey-Tribbiani.jpg', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://i.pinimg.com/originals/f7/30/a0/f730a00f24b13da6d2012b7094683621.jpg', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/11/09/11/joey-friends.jpg?quality=75&width=982&height=726&auto=webp', name: '06', topic: 'Face' },
    { imgUrl: 'https://st1.latestly.com/wp-content/uploads/2020/07/01-15-380x214.jpg', name: '07', topic: 'Good' },
];
const Movie = [
    { imgUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-actors-got-their-start-on-tv-1607725466.jpg?crop=0.409xw:0.817xh;0.0529xw,0.00962xh&resize=640:*', name: 'movie_01', topic: 'Movie' },
    { imgUrl: 'https://media1.popsugar-assets.com/files/thumbor/PkVi0CfVJtMbJLOLQacIadEpZ0c/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/12/03/761/n/1922283/a80bb7bf_edit_img_image_33388244_1447776000/i/Movie-Stars-Who-Started-Out-TV.jpg', name: 'movie_02', topic: 'Movie' },
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYxNTEwNTM2ODQyODQ3NDQ0/will-smith-men-in-black.jpg', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://media.workandmoney.com/64/f6/64f66bf1508f415fbb5ab0a64eda450d.jpeg', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/04/2560x3532/gettyimages-476575055.jpg?resize=480:*', name: '06', topic: 'Face' },
    { imgUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gal-gadot-attends-the-2020-vanity-fair-oscar-party-hosted-news-photo-1591212178.jpg?crop=1xw:0.99975xh;center,top&resize=480:*', name: '07', topic: 'Good' },
];
const Vedio = [
    { imgUrl: './img/01.png', name: '01', topic: 'Star' },
    { imgUrl: './img/02.png', name: '02', topic: 'House' },
    { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '06', topic: 'Face' },
    { imgUrl: './img/07.png', name: '07', topic: 'Good' },
];

const President = [
    { imgUrl: 'https://images.unsplash.com/photo-1580130379624-3a069adbffc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJlc2lkZW50fGVufDB8fDB8fA%3D%3D&w=1000&q=80', name: '01', topic: 'President' },
    { imgUrl: 'https://image.cnbcfm.com/api/v1/image/104345735-GettyImages-653677586.jpg?v=1529474517&w=740&h=416&ffmt=webp', name: '02', topic: 'President' },
    { imgUrl: 'https://cdn.britannica.com/55/91555-131-C5BCDFC8/Gerald-R-Ford.jpg?q=60', name: '03', topic: 'President' },
    { imgUrl: 'https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/46-joe-biden.png', name: '04', topic: 'President' },
    { imgUrl: 'https://www.aljazeera.com/wp-content/uploads/2022/02/AP22052707918559.jpg?resize=770%2C513', name: '05', topic: 'President' },
    { imgUrl: 'https://www.whitehouse.gov/wp-content/uploads/2021/01/43_george_w_bush.jpg', name: '06', topic: 'President' },
    { imgUrl: 'https://c.ndtvimg.com/2020-09/46c72q8o_president-ram-nath-kovind-pti_625x300_19_September_20.jpg?im=Resize=(1230,900)', name: '07', topic: 'President' },
];

const Game_of_Thrones = [
    { imgUrl: 'https://media.wired.com/photos/5ce2cb8cc24878f51ab12540/master/pass/Culture_GOTFinale_Crosstalk.jpg', name: '01', topic: 'Game_of_Thrones' },
    { imgUrl: 'https://assets.vogue.com/photos/589176397edfa70512d6493d/master/pass/jon-snow-game-of-thrones.jpg', name: '02', topic: 'Game_of_Thrones' },
    { imgUrl: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F02%2Fhelen-sloan-hbo-3.jpg&q=60', name: '03', topic: 'Game_of_Thrones' },
    { imgUrl: 'https://media.wired.com/photos/5cdcb1b82c90a35c66b7da8b/master/pass/Culture_GOT_Storytelling.jpg', name: '04', topic: 'Game_of_Thrones' },
    { imgUrl: 'https://images.squarespace-cdn.com/content/v1/52fc05c9e4b08fc45bd99090/1563302834562-M0WSL1SOJKQ81KHSR2LR/got-emmy-nom-2019-1920+%281%29.jpg?format=2500w', name: '05', topic: 'Game_of_Thrones' },
    { imgUrl: 'https://api.time.com/wp-content/uploads/2019/05/game-of-thrones-s8-e6-arya-stark.jpeg', name: '06', topic: 'Game_of_Thrones' },
    { imgUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/08/15/08/game-of-thrones-jaime-lannister-horse.jpg?quality=50&width=640&auto=webp', name: '07', topic: 'Game_of_Thrones' },
];

const Harry_Potter = [
    { imgUrl: 'https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg', name: '01', topic: 'Harry_Potter' },
    { imgUrl: 'https://i.insider.com/5ece9322f34d050a92546892?width=1000&format=jpeg&auto=webp', name: '02', topic: 'Harry_Potter' },
    { imgUrl: 'https://deadline.com/wp-content/uploads/2021/03/MEGA420148_040-e1616112754104.jpg?w=681&h=383&crop=1', name: '03', topic: 'Harry_Potter' },
    { imgUrl: 'https://i.insider.com/5cf6db2c594ea513a80f5597?width=700', name: '04', topic: 'Harry_Potter' },
    { imgUrl: 'https://images.ctfassets.net/usf1vwtuqyxm/7GXo7mab9pPauATRz3qyuL/7760eadc44c1d84a161109a9df074636/HP-F2-chamber-of-secrets-hermione-writing-quill-thoughtful-web-landscape', name: '05', topic: 'Harry_Potter' },
    { imgUrl: 'https://www.foxtel.com.au/content/dam/foxtel/whats-on/insider/2021/november/harry-potter-800x450.jpg', name: '06', topic: 'Harry_Potter' },
    { imgUrl: 'https://media1.popsugar-assets.com/files/thumbor/xE8u-G0SXl291R6ohkFVw5nG71k/273x202:2620x2549/fit-in/550x550/filters:format_auto-!!-:strip_icc-!!-/2022/01/05/830/n/1922283/e161474f61d5e9c43455a0.98910495_/i/emma-watson-responds-to-harry-potter-emma-roberts-mistake.jpg', name: '07', topic: 'Harry_Potter' },
];

const Marvel = [
    { imgUrl: 'https://www.thefactsite.com/wp-content/uploads/2021/04/thor-facts.jpg', name: '01', topic: 'marvel' },
    { imgUrl: 'https://bgr.com/wp-content/uploads/2021/12/spider-man-no-way-home-2.jpg?quality=82&strip=all&w=1440&h=733&crop=1', name: '02', topic: 'marvel' },
    { imgUrl: 'https://bgr.com/wp-content/uploads/2019/11/avengers-endgame-iron-man-gauntlet.jpg?quality=82&strip=all', name: '03', topic: 'marvel' },
    { imgUrl: 'https://i.insider.com/5ca38e1a92c8862ab30b0f93?width=600&format=jpeg&auto=webp', name: '04', topic: 'marvel' },
    { imgUrl: 'https://w0.peakpx.com/wallpaper/223/397/HD-wallpaper-captain-america-avengers-endgame-captain-america-marvel-marvel-comics-marvel-superheroes-superheroes.jpg', name: '05', topic: 'marvel' },
    { imgUrl: 'https://chorus.stimg.co/23032387/hawkeye.jpg?fit=crop&crop=faces', name: '06', topic: 'marvel' },
    { imgUrl: 'https://www.giantfreakinrobot.com/wp-content/uploads/2021/05/Brie-Larson-Captain-Marvel-feature-900x506.jpg', name: '07', topic: 'marvel' },
];