import React, { useState } from "react";
import EditVideo from './EditVideo';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import { Row, Col } from 'react-bootstrap';
import '../style/Slideshow.css';
import '../style/sider.css';
import '../style/AI_face.css'
import { Layout, Menu } from 'antd';
import AIFaceGallery from "./AIFaceGallery";
import AIFaceHistory from "./AIFaceHistory";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export const AI_face = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectTab, setSelectTab] = useState("first");
    const [selectTab1, setSelectTab1] = useState(true);
    const [selectTab2, setSelectTab2] = useState(false);
    const [selectTab3, setSelectTab3] = useState(false);
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
                                    <Nav.Item>
                                        <Nav.Link eventKey="first"
                                            onClick={() => { setSelectTab("first") }}
                                            onMouseEnter={() => { setSelectTab1(true) }}
                                            onMouseLeave={() => { setSelectTab1(false) }}>
                                            <img src={(selectTab == "first" || selectTab1) ? "AI_face_images/face_active.png" : "AI_face_images/face_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} />
                                            <p>Face</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second"
                                            onClick={() => { setSelectTab("second") }}
                                            onMouseEnter={() => { setSelectTab2(true) }}
                                            onMouseLeave={() => { setSelectTab2(false) }}>
                                            <img src={(selectTab == "second" || selectTab2) ? "AI_face_images/popular_active.png" : "AI_face_images/popular_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} />
                                            <p>Popular</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third"
                                            onClick={() => { setSelectTab("third") }}
                                            onMouseEnter={() => { setSelectTab3(true) }}
                                            onMouseLeave={() => { setSelectTab3(false) }}>
                                            <img src={(selectTab == "third" || selectTab3) ? "AI_face_images/history_active.png" : "AI_face_images/history_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} />
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
                                        <AIFaceGallery title="Friends" images={Friends} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <AIFaceGallery title="Movie Star" images={Movie_p} />
                                        <AIFaceGallery title="President" images={President_p} />
                                        <AIFaceGallery title="Game_of_Thrones" images={Game_of_Thrones_p} />
                                        <AIFaceGallery title="Marvel" images={Marvel_p} />
                                        <AIFaceGallery title="Harry Potter" images={Harry_Potter_p} />
                                        <AIFaceGallery title="Singer" images={Face_Singers_p} />
                                        <AIFaceGallery title="Friends" images={Friends_p} />
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
    'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYxNTEwNTM2ODQyODQ3NDQ0/will-smith-men-in-black.jpg',
    'https://media.workandmoney.com/64/f6/64f66bf1508f415fbb5ab0a64eda450d.jpeg',
    'https://pic1.zhimg.com/80/v2-1640be6c8cef52b267d0e7ab132724e4_1440w.jpg',
    'https://pic.baike.soso.com/ugc/baikepic2/5655/cut-20180615091132-1143406756_jpg_455_341_15843.jpg/1284',
    'http://5b0988e595225.cdn.sohucs.com/images/20181212/49141202a3154b5eb4553dc366dd3587.jpeg',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/g-1599107211.jpg?crop=0.495xw:0.984xh;0,0.0160xh&resize=640:*',
    'https://pic.baike.soso.com/ugc/baikepic2/23096/cut-20170413105648-1292415590.jpg/800',
];
const Face_Singers = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdA_-rNSScGyaVKRkA7FkHsjVlbxjIYihtYA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5FbK5cYcUxvmo7Of1VS7K4PrHNXWIpL-xTQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1qbk5DdWrBQ7GTegjZ_5bJpr-J8l3o2wlTw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlbYB7DxCZwteEaHnLHIw4WWKaoZoCH_RKTA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9v0ICFWny_eh_HBw7yw4p44nVYOboJIXpIQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWS2o9Xhju8jsP3zCwsas--mqZYvwaAQFMww&usqp=CAU',
    'https://www.thefamouspeople.com/profiles/thumbs/michael-jackson-3.jpg',
    'https://popmellow.com/wp-content/uploads/2021/09/Top-Most-Popular-Female-Singers.jpg',
    'https://i.insider.com/5ee7e56c4dca68340574b328?width=750&format=jpeg&auto=webp',
];

const Friends = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLysfblilvBqTDNXvMILLekdjUW2-PsEKtg&usqp=CAU',
    'https://d207ibygpg2z1x.cloudfront.net/image/upload/v1541181492/articles_upload/content/nsafehc82lfmkwroe1tg.jpg',
    'https://www.irishexaminer.com/cms_media/module_img/4972/2486069_10_seoimage1x1_E2jArIRWUAM-0jT.jpg',
    'https://i.pinimg.com/originals/f7/30/a0/f730a00f24b13da6d2012b7094683621.jpg',
    'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/11/09/11/joey-friends.jpg?quality=75&width=982&height=726&auto=webp',
    'https://st1.latestly.com/wp-content/uploads/2020/07/01-15-380x214.jpg',
    'https://sites.google.com/site/friendsfancy/_/rsrc/1235492784454/f/2/Ross.jpg?height=533&width=328',
    'https://ichef.bbci.co.uk/news/640/cpsprodpb/1066A/production/_95187176_hi038503807.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ixGwL9gR8XsrhUArdoZTxOy8g7aNAPt0rH1N_9oBWnOtlz2Bf59SHaBIVJ__sQ4feGQ&usqp=CAU',
];

const President = [
    'https://images.unsplash.com/photo-1580130379624-3a069adbffc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJlc2lkZW50fGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    'https://image.cnbcfm.com/api/v1/image/104345735-GettyImages-653677586.jpg?v=1529474517&w=740&h=416&ffmt=webp',
    'https://cdn.britannica.com/55/91555-131-C5BCDFC8/Gerald-R-Ford.jpg?q=60',
    'https://www.loc.gov/static/portals/free-to-use/public-domain/presidential-portraits/46-joe-biden.png',
    'https://www.aljazeera.com/wp-content/uploads/2022/02/AP22052707918559.jpg?resize=770%2C513',
    'https://www.whitehouse.gov/wp-content/uploads/2021/01/43_george_w_bush.jpg',
    'https://c.ndtvimg.com/2020-09/46c72q8o_president-ram-nath-kovind-pti_625x300_19_September_20.jpg?im=Resize=(1230,900)',
    'https://img-xhpfm.zhongguowangshi.com/News/202104/XxjinmC007004_20210427_CBMFN0A001.jpg?x-oss-process=image/resize,w_1000/auto-orient,1/quality,Q_80',
    'https://www.glofang.com/file/upload/202111/15/17-17-45-37-1.png',
];

const Game_of_Thrones = [
    'https://media.wired.com/photos/5ce2cb8cc24878f51ab12540/master/pass/Culture_GOTFinale_Crosstalk.jpg',
    'https://assets.vogue.com/photos/589176397edfa70512d6493d/master/pass/jon-snow-game-of-thrones.jpg',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F02%2Fhelen-sloan-hbo-3.jpg&q=60',
    'https://media.wired.com/photos/5cdcb1b82c90a35c66b7da8b/master/pass/Culture_GOT_Storytelling.jpg',
    'https://images.squarespace-cdn.com/content/v1/52fc05c9e4b08fc45bd99090/1563302834562-M0WSL1SOJKQ81KHSR2LR/got-emmy-nom-2019-1920+%281%29.jpg?format=2500w',
    'https://api.time.com/wp-content/uploads/2019/05/game-of-thrones-s8-e6-arya-stark.jpeg',
    'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/08/15/08/game-of-thrones-jaime-lannister-horse.jpg?quality=50&width=640&auto=webp',
    'https://i3.jueshifan.com/7b077d80/79067e8b/7c432bd84efebe1c8e31.png',
    'https://i3.jueshifan.com/205a28/7a047e8a/71502dd61aacfa5a9732.jpg',
];

const Harry_Potter = [
    'https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg',
    'https://i.insider.com/5ece9322f34d050a92546892?width=1000&format=jpeg&auto=webp',
    'https://deadline.com/wp-content/uploads/2021/03/MEGA420148_040-e1616112754104.jpg?w=681&h=383&crop=1',
    'https://i.insider.com/5cf6db2c594ea513a80f5597?width=700',
    'https://images.ctfassets.net/usf1vwtuqyxm/7GXo7mab9pPauATRz3qyuL/7760eadc44c1d84a161109a9df074636/HP-F2-chamber-of-secrets-hermione-writing-quill-thoughtful-web-landscape',
    'https://www.foxtel.com.au/content/dam/foxtel/whats-on/insider/2021/november/harry-potter-800x450.jpg',
    'https://media1.popsugar-assets.com/files/thumbor/xE8u-G0SXl291R6ohkFVw5nG71k/273x202:2620x2549/fit-in/550x550/filters:format_auto-!!-:strip_icc-!!-/2022/01/05/830/n/1922283/e161474f61d5e9c43455a0.98910495_/i/emma-watson-responds-to-harry-potter-emma-roberts-mistake.jpg',
    //'http://p1.itc.cn/images01/20200629/32f838ca0d7941c6bda25f8cdf459e4f.jpeg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXDvX1kLDX0-eqeK6NXODJdWYtmgghd0wQw&usqp=CAU',
];

const Marvel = [
    'https://www.thefactsite.com/wp-content/uploads/2021/04/thor-facts.jpg',
    'https://bgr.com/wp-content/uploads/2021/12/spider-man-no-way-home-2.jpg?quality=82&strip=all&w=1440&h=733&crop=1',
    'https://bgr.com/wp-content/uploads/2019/11/avengers-endgame-iron-man-gauntlet.jpg?quality=82&strip=all',
    'https://i.insider.com/5ca38e1a92c8862ab30b0f93?width=600&format=jpeg&auto=webp',
    'https://w0.peakpx.com/wallpaper/223/397/HD-wallpaper-captain-america-avengers-endgame-captain-america-marvel-marvel-comics-marvel-superheroes-superheroes.jpg',
    'https://chorus.stimg.co/23032387/hawkeye.jpg?fit=crop&crop=faces',
    'https://www.giantfreakinrobot.com/wp-content/uploads/2021/05/Brie-Larson-Captain-Marvel-feature-900x506.jpg',
    'https://cm-santiago-do-cacem.pt/img/movies/19/doctor-strange-teams-up-with-scarlet-witch-multiverse-madness-trailer.jpg',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/loki-tom-hiddleston-1623746367.jpg?crop=0.502xw:1.00xh;0.258xw,0&resize=640:*',
];
const Movie_p = [
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-actors-got-their-start-on-tv-1607725466.jpg?crop=0.409xw:0.817xh;0.0529xw,0.00962xh&resize=640:*',
    'https://media.workandmoney.com/64/f6/64f66bf1508f415fbb5ab0a64eda450d.jpeg',
    //'http://5b0988e595225.cdn.sohucs.com/images/20181212/49141202a3154b5eb4553dc366dd3587.jpeg',
];
const Face_Singers_p = [
    'https://www.thefamouspeople.com/profiles/thumbs/michael-jackson-3.jpg',
    'https://popmellow.com/wp-content/uploads/2021/09/Top-Most-Popular-Female-Singers.jpg',
    'https://i.insider.com/5ee7e56c4dca68340574b328?width=750&format=jpeg&auto=webp',
];

const Friends_p = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLysfblilvBqTDNXvMILLekdjUW2-PsEKtg&usqp=CAU',
    'https://www.irishexaminer.com/cms_media/module_img/4972/2486069_10_seoimage1x1_E2jArIRWUAM-0jT.jpg',
    'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/11/09/11/joey-friends.jpg?quality=75&width=982&height=726&auto=webp',
    ];

const President_p = [
    'https://cdn.britannica.com/55/91555-131-C5BCDFC8/Gerald-R-Ford.jpg?q=60',
    'https://www.aljazeera.com/wp-content/uploads/2022/02/AP22052707918559.jpg?resize=770%2C513',
    'https://www.whitehouse.gov/wp-content/uploads/2021/01/43_george_w_bush.jpg',
];

const Game_of_Thrones_p = [
    'https://media.wired.com/photos/5ce2cb8cc24878f51ab12540/master/pass/Culture_GOTFinale_Crosstalk.jpg',
    'https://assets.vogue.com/photos/589176397edfa70512d6493d/master/pass/jon-snow-game-of-thrones.jpg',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F02%2Fhelen-sloan-hbo-3.jpg&q=60',
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

