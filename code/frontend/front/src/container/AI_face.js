import React, { useState } from "react";
import EditVideo from './EditVideo';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import { Row, Col } from 'react-bootstrap';
import '../style/Slideshow.css';
import '../style/sider.css';
import '../style/AI_face.css'
import { Layout } from 'antd';
import AIFaceGallery from "./AIFaceGallery";
import AIFaceHistory from "./AIFaceHistory";
const { Content, Sider } = Layout;

export const AI_face = () => {
    const [selectTab, setSelectTab] = useState("first");
    const [selectTab1, setSelectTab1] = useState(true);
    const [selectTab2, setSelectTab2] = useState(false);
    const [selectTab3, setSelectTab3] = useState(false);

    return (
        <>
            <Layout hasSider style={{ marginTop: '4.5%' }}>
                <Sider
                    theme="light" width='32%' collapsedWidth='5%'
                    style={{
                        height: 'auto',
                        width: '100%',
                    }}
                >
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row style={{ height: "100%" }}>
                            <Col sm={3} style={{ borderRight: "2px solid #E2E1E2" }}>
                                <Nav justify variant="pills" className="flex-column myNav">
                                    <Nav.Item style={{ marginBottom: "5vh" }}>
                                        <Nav.Link eventKey="first"
                                            onClick={() => { setSelectTab("first") }}
                                            onMouseEnter={() => { setSelectTab1(true) }}
                                            onMouseLeave={() => { setSelectTab1(false) }}>
                                            <img src={(selectTab === "first" || selectTab1) ? "AI_face_images/face_active.png" : "AI_face_images/face_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} alt="" />
                                            <p>Face</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{ marginBottom: "5vh" }}>
                                        <Nav.Link eventKey="second"
                                            onClick={() => { setSelectTab("second") }}
                                            onMouseEnter={() => { setSelectTab2(true) }}
                                            onMouseLeave={() => { setSelectTab2(false) }}>
                                            <img src={(selectTab === "second" || selectTab2) ? "AI_face_images/popular_active.png" : "AI_face_images/popular_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} alt="" />
                                            <p>Popular</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{ marginBottom: "5vh" }}>
                                        <Nav.Link eventKey="third"
                                            onClick={() => { setSelectTab("third") }}
                                            onMouseEnter={() => { setSelectTab3(true) }}
                                            onMouseLeave={() => { setSelectTab3(false) }}>
                                            <img src={(selectTab === "third" || selectTab3) ? "AI_face_images/history_active.png" : "AI_face_images/history_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} alt="" />
                                            <p>History</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content style={{ overflowY: "scroll", maxHeight: "1080px" }}>
                                    <Tab.Pane eventKey="first">
                                        <AIFaceGallery title="Movie Star" images={Movie} />
                                        <AIFaceGallery title="President" images={President} />
                                        <AIFaceGallery title="Game_of_Thrones" images={Game_of_Thrones} />
                                        <AIFaceGallery title="Marvel" images={Marvel} />
                                        <AIFaceGallery title="Harry Potter" images={Harry_Potter} />
                                        <AIFaceGallery title="Singer" images={Face_Singers} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <AIFaceGallery title="Movie Star" images={Movie_p} />
                                        <AIFaceGallery title="President" images={President_p} />
                                        <AIFaceGallery title="Game_of_Thrones" images={Game_of_Thrones_p} />
                                        <AIFaceGallery title="Marvel" images={Marvel_p} />
                                        <AIFaceGallery title="Harry Potter" images={Harry_Potter_p} />
                                        <AIFaceGallery title="Singer" images={Face_Singers_p} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <AIFaceHistory />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>

                </Sider >

                <Layout className="site-layout" style={{ marginLeft: 0 }}>
                    <h2 style={{ marginTop: "2%", textAlign: "center", fontFamily: "'Times New Roman', Times, serif" }}>FACE SWAP</h2>
                    <Content style={{ overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                            <EditVideo />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

const Movie = [
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-actors-got-their-start-on-tv-1607725466.jpg?crop=0.409xw:0.817xh;0.0529xw,0.00962xh&resize=640:*',
    'https://media1.popsugar-assets.com/files/thumbor/PkVi0CfVJtMbJLOLQacIadEpZ0c/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/12/03/761/n/1922283/a80bb7bf_edit_img_image_33388244_1447776000/i/Movie-Stars-Who-Started-Out-TV.jpg',
    'https://media.workandmoney.com/64/f6/64f66bf1508f415fbb5ab0a64eda450d.jpeg',
    'https://pic1.zhimg.com/80/v2-1640be6c8cef52b267d0e7ab132724e4_1440w.jpg',
    'https://pic.baike.soso.com/ugc/baikepic2/5655/cut-20180615091132-1143406756_jpg_455_341_15843.jpg/1284',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/g-1599107211.jpg?crop=0.495xw:0.984xh;0,0.0160xh&resize=640:*',
    'https://pic.baike.soso.com/ugc/baikepic2/23096/cut-20170413105648-1292415590.jpg/800',
    'https://p9-bk.byteimg.com/tos-cn-i-mlhdmxsy5m/d1dd7c3f9ebe4e8395d48ef435a39dea~tplv-mlhdmxsy5m-q75:0:0.image',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW5RQMaSJli_cIFTsv-Bg_DiSMkvM8CsOMnw&usqp=CAU',
];
const Face_Singers = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdA_-rNSScGyaVKRkA7FkHsjVlbxjIYihtYA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5FbK5cYcUxvmo7Of1VS7K4PrHNXWIpL-xTQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1qbk5DdWrBQ7GTegjZ_5bJpr-J8l3o2wlTw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlbYB7DxCZwteEaHnLHIw4WWKaoZoCH_RKTA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9v0ICFWny_eh_HBw7yw4p44nVYOboJIXpIQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROFmYif5MKEbwdPFwt4K7hhNcHLPhMBMDeA&usqp=CAU',
    'https://cdn.justjared.com/wp-content/uploads/headlines/2022/04/ed-sheeran-wins-copyright.jpg',
    'http://image.uc.cn/s/wemedia/s/upload/2022,/7d49942ffcef8539b1ba569ff48f5163.jpg',
    'https://img.buzzfeed.com/buzzfeed-static/static/2022-01/13/16/asset/68a1902f26c4/sub-buzz-4825-1642089650-6.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto',
];

const President = [
    'https://images.unsplash.com/photo-1580130379624-3a069adbffc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJlc2lkZW50fGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    'https://cdn.britannica.com/55/91555-131-C5BCDFC8/Gerald-R-Ford.jpg?q=60',
    'https://static01.nyt.com/images/2019/04/01/opinion/01goldbergWeb/merlin_152287446_884ec429-2a06-4051-a552-d455768fe31c-master1050.jpg',
    'https://www.whitehouse.gov/wp-content/uploads/2021/01/43_george_w_bush.jpg',
    'https://c.ndtvimg.com/2020-09/46c72q8o_president-ram-nath-kovind-pti_625x300_19_September_20.jpg?im=Resize=(1230,900)',
    'https://www.glofang.com/file/upload/202111/15/17-17-45-37-1.png',
    'https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTc0MzMxNjUzNjM0NzI5NjA2/donald-trump-gettyimages-687193180.jpg',
    'https://globalcn.biz/usr/person/big-person-16091763601.jpg',
    'https://i0.wp.com/www.mobileworldlive.com/wp-content/uploads/2019/10/Boris-Johnson.jpg?fit=650%2C400&ssl=1',
];

const Game_of_Thrones = [
    'https://media.wired.com/photos/5ce2cb8cc24878f51ab12540/master/pass/Culture_GOTFinale_Crosstalk.jpg',
    'https://assets.vogue.com/photos/589176397edfa70512d6493d/master/pass/jon-snow-game-of-thrones.jpg',
    'https://media.wired.com/photos/5cdcb1b82c90a35c66b7da8b/master/pass/Culture_GOT_Storytelling.jpg',
    'https://images.squarespace-cdn.com/content/v1/52fc05c9e4b08fc45bd99090/1563302834562-M0WSL1SOJKQ81KHSR2LR/got-emmy-nom-2019-1920+%281%29.jpg?format=2500w',
    'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/08/15/08/game-of-thrones-jaime-lannister-horse.jpg?quality=50&width=640&auto=webp',
    'https://images2.minutemediacdn.com/image/upload/c_crop,h_840,w_1500,x_0,y_6/f_auto,q_auto,w_1100/v1555003564/shape/mentalfloss/jon_snow_hed.jpg',
    'https://i.guim.co.uk/img/media/02f5315a3ddd09325377357e22f052a9a6759e1e/0_249_4000_2400/master/4000.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=98ff9bf1ad2f11b0c5e0968eed107cb6',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cersei-euron-gift-1500579238.png?crop=0.563xw:1xh;center,top&resize=480:*',
    'https://m.media-amazon.com/images/M/MV5BMTkzODQ1MDg3NV5BMl5BanBnXkFtZTcwODA4NDk4OQ@@._V1_.jpg',
];

const Harry_Potter = [
    'https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg',
    'https://i.insider.com/5ece9322f34d050a92546892?width=1000&format=jpeg&auto=webp',
    'https://deadline.com/wp-content/uploads/2021/03/MEGA420148_040-e1616112754104.jpg?w=681&h=383&crop=1',
    'https://i.insider.com/59f1e2b61f58cc4c008b458a?width=700',
    'https://pyxis.nymag.com/v1/imgs/72f/707/3fc542812dba415d446dabec3f697627b0-08-harry-potter.rsquare.w330.jpg',
    'https://media1.popsugar-assets.com/files/thumbor/xE8u-G0SXl291R6ohkFVw5nG71k/273x202:2620x2549/fit-in/550x550/filters:format_auto-!!-:strip_icc-!!-/2022/01/05/830/n/1922283/e161474f61d5e9c43455a0.98910495_/i/emma-watson-responds-to-harry-potter-emma-roberts-mistake.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXDvX1kLDX0-eqeK6NXODJdWYtmgghd0wQw&usqp=CAU',
    'http://sports.cctv.com/20090714/images/1247568014264_U105P28T3D2591890F329DT20090704114552.jpg',
    'https://sites.google.com/site/harrypotterlibary/_/rsrc/1429262672776/home/harrypeople/ron-weasley/YLqNNlOMPHa1UPthRbs7jA.jpg?height=400&width=299',
];

const Marvel = [
    'https://i.epochtimes.com/assets/uploads/2020/04/GettyImages-1158321730-450x319.jpg',
    'https://bgr.com/wp-content/uploads/2019/11/avengers-endgame-iron-man-gauntlet.jpg?quality=82&strip=all',
    'https://i.insider.com/5ca38e1a92c8862ab30b0f93?width=600&format=jpeg&auto=webp',
    'https://www.giantfreakinrobot.com/wp-content/uploads/2021/05/Brie-Larson-Captain-Marvel-feature-900x506.jpg',
    'https://pyxis.nymag.com/v1/imgs/288/3b0/e54e4bfd4095f34eca92495317353abcb8-23-doctor-strange.rsquare.w700.jpg',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/loki-tom-hiddleston-1623746367.jpg?crop=0.502xw:1.00xh;0.258xw,0&resize=640:*',
    'https://m.economictimes.com/thumb/height-450,width-600,imgsize-220108,msid-69139984/captainamerica.jpg',
    'https://pic1.xuehuaimg.com/proxy/baijia/https://f12.baidu.com/it/u=2759402060,1227194417&fm=173&app=49&f=JPEG?w=640&h=640&s=BDA3EB1765DAD3D41002AD6403006063&access=215967316',
    'https://www.ign.com.cn/sm/ign_cn/screenshot/default/5_vq9e.jpg',
];
const Movie_p = [
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-actors-got-their-start-on-tv-1607725466.jpg?crop=0.409xw:0.817xh;0.0529xw,0.00962xh&resize=640:*',
    'https://media.workandmoney.com/64/f6/64f66bf1508f415fbb5ab0a64eda450d.jpeg',
    'https://pic1.zhimg.com/80/v2-1640be6c8cef52b267d0e7ab132724e4_1440w.jpg',
];
const Face_Singers_p = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROFmYif5MKEbwdPFwt4K7hhNcHLPhMBMDeA&usqp=CAU',
    'https://cdn.justjared.com/wp-content/uploads/headlines/2022/04/ed-sheeran-wins-copyright.jpg',
    'http://image.uc.cn/s/wemedia/s/upload/2022,/7d49942ffcef8539b1ba569ff48f5163.jpg',
];


const President_p = [
    'https://cdn.britannica.com/55/91555-131-C5BCDFC8/Gerald-R-Ford.jpg?q=60',
    'https://globalcn.biz/usr/person/big-person-16091763601.jpg',
    'https://www.whitehouse.gov/wp-content/uploads/2021/01/43_george_w_bush.jpg',
];

const Game_of_Thrones_p = [
    'https://i.guim.co.uk/img/media/02f5315a3ddd09325377357e22f052a9a6759e1e/0_249_4000_2400/master/4000.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=98ff9bf1ad2f11b0c5e0968eed107cb6',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cersei-euron-gift-1500579238.png?crop=0.563xw:1xh;center,top&resize=480:*',
    'https://m.media-amazon.com/images/M/MV5BMTkzODQ1MDg3NV5BMl5BanBnXkFtZTcwODA4NDk4OQ@@._V1_.jpg',
];

const Harry_Potter_p = [
    'https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg',
    'https://i.insider.com/5ece9322f34d050a92546892?width=1000&format=jpeg&auto=webp',
    'https://deadline.com/wp-content/uploads/2021/03/MEGA420148_040-e1616112754104.jpg?w=681&h=383&crop=1',
];

const Marvel_p = [
    'https://bgr.com/wp-content/uploads/2019/11/avengers-endgame-iron-man-gauntlet.jpg?quality=82&strip=all',
    'https://i.insider.com/5ca38e1a92c8862ab30b0f93?width=600&format=jpeg&auto=webp',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/loki-tom-hiddleston-1623746367.jpg?crop=0.502xw:1.00xh;0.258xw,0&resize=640:*',
];

