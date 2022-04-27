import React, { useState } from "react";
import EditStyle from './EditStyle';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import { Row, Col } from 'react-bootstrap';
import AIStyleGallery from "./AIStyleGallery";
import AIStyleHistory from "./AIStyleHistory";
import '../style/AI_style.css'



import { Layout } from 'antd';

const { Content, Sider } = Layout;

export const AI_style = () => {
    const [selectTab, setSelectTab] = useState("first");
    const [selectTab1, setSelectTab1] = useState(true);
    const [selectTab2, setSelectTab2] = useState(false);
    const [selectTab3, setSelectTab3] = useState(false);
    const [selectTab4, setSelectTab4] = useState(false);


    return (
        <>
            <Layout hasSider style={{ marginTop: '4.5%' }}>
                <Sider
                    theme="light" width='33%' collapsedWidth='5%'
                    style={{
                        height: 'auto',
                        width: '100%',
                        // overflow: 'auto',
                        // position: 'fixed',
                    }}
                >
                    {/* <div className="logo" /> */}
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row style={{ height: "100%" }}>
                            <Col sm={4} style={{ borderRight: "2px solid #E2E1E2" }}>
                                <Nav justify variant="pills" className="flex-column myNav">
                                    <Nav.Item style={{ marginBottom: "5vh" }}>
                                        <Nav.Link eventKey="first"
                                            onClick={() => { setSelectTab("first") }}
                                            onMouseEnter={() => { setSelectTab1(true) }}
                                            onMouseLeave={() => { setSelectTab1(false) }}>
                                            <img src={(selectTab == "first" || selectTab1) ? "AI_style_images/style_active.png" : "AI_style_images/style_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} />
                                            <p>Style</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{ marginBottom: "5vh" }}>
                                        <Nav.Link eventKey="second"
                                            onClick={() => { setSelectTab("second") }}
                                            onMouseEnter={() => { setSelectTab2(true) }}
                                            onMouseLeave={() => { setSelectTab2(false) }}>
                                            <img src={(selectTab == "second" || selectTab2) ? "AI_style_images/content_active.png" : "AI_style_images/content_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} />
                                            <p>Content</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{ marginBottom: "5vh" }}>
                                        <Nav.Link eventKey="third"
                                            onClick={() => { setSelectTab("third") }}
                                            onMouseEnter={() => { setSelectTab3(true) }}
                                            onMouseLeave={() => { setSelectTab3(false) }}>
                                            <img src={(selectTab == "third" || selectTab3) ? "AI_style_images/popular_active.png" : "AI_style_images/popular_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} />
                                            <p>Popular</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{ marginBottom: "5vh" }}>
                                        <Nav.Link eventKey="forth"
                                            onClick={() => { setSelectTab("forth") }}
                                            onMouseEnter={() => { setSelectTab4(true) }}
                                            onMouseLeave={() => { setSelectTab4(false) }}>
                                            <img src={(selectTab == "forth" || selectTab4) ? "AI_style_images/history_active.png" : "AI_style_images/history_inactive.png"} width="40" height="40" style={{ marginTop: "25%" }} />
                                            <p>History</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content style={{ overflowY: "scroll", maxHeight: "1080px" }}>
                                    <Tab.Pane eventKey="first">
                                        <AIStyleGallery title="Van Gogh" images={style_vangogh} control="style" />
                                        <AIStyleGallery title="Chinese" images={style_chinese} control="style" />
                                        <AIStyleGallery title="Raffaello" images={style_raff} control="style" />
                                        <AIStyleGallery title="Pencil" images={style_pencil} control="style" />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <AIStyleGallery title="Building" images={content_building} control="content" />
                                        <AIStyleGallery title="landscape" images={content_landscape} control="content" />
                                        <AIStyleGallery title="People" images={content_people} control="content" />
                                        <AIStyleGallery title="Animal" images={content_animal} control="content" />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <AIStyleGallery title="Popular Content" images={popular_content} control="content" />
                                        <AIStyleGallery title="Popular Style" images={popular_style} control="style" />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="forth">
                                        <AIStyleHistory />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>

                </Sider >

                <Layout className="site-layout" style={{ marginLeft: 0 }}>
                    <h2 style={{ marginTop: "2%", textAlign: "center", fontFamily: "'Times New Roman', Times, serif" }}>STYLE TRANSFER</h2>
                    <Content style={{ overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                            <EditStyle />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

const style_vangogh = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/970px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "https://cdn.cnn.com/cnnnext/dam/assets/211015173306-meules-de-ble-painting-van-gogh-full-169.jpg",
    "https://mymodernmet.com/wp/wp-content/uploads/2020/11/White-house-night-van-goh-worldwide-2.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Irises-Vincent_van_Gogh.jpg/640px-Irises-Vincent_van_Gogh.jpg",
    "https://media.architecturaldigest.com/photos/5c991cc56b6fbc66bc4dd3aa/16:9/w_2560%2Cc_limit/GettyImages-973792302.jpg",
    "https://i.ebayimg.com/images/g/t4AAAOSwNTZfr8vo/s-l400.jpg"
]

const style_chinese = [
    "https://www.worldhistory.org/img/r/p/500x600/7407.jpg?v=1645281002",
    "https://frommetertomeaning.files.wordpress.com/2020/12/bird.jpg",
    "https://www.christies.com/media-library/images/salelandingpage/2016/hk112016/hong-kong-2016-autumn-auctions/hong-kong-2016-autumn-auctions-chinese-painting-07.jpg",
    "https://images.fineartamerica.com/images-medium-large-5/chinese-landscape-sean-seal.jpg",
    //"http://twistedsifter.com/wp-content/uploads/2011/10/photographs-that-look-like-traditional-chinese-paintins-dong-hong-oai-asian-pictorialism-1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtSuuxBkKUiLnPs0DggzOoljlch29AStzFyw&usqp=CAU"
]

const style_raff = [
    //"http://tomalcockba5.files.wordpress.com/2011/01/raphael-school-of-athens1.jpg",
    "https://www.theartstory.org/images20/works/raphael_2.jpg",
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/12/15/13/allegory-justice.jpg?width=1200",
    "https://upload.wikimedia.org/wikipedia/commons/e/ea/Arazzi_di_raffaello%2C_cartone_04.jpg",
    "https://previews.agefotostock.com/previewimage/medibigoff/9dc85fa1fd2c576a9c47766a94d5321c/x4j-2814005.jpg",
    "https://artsdot.com/ADC/Art-ImgScreen-2.nsf/O/A-8XYTLU/$FILE/Raphael_raffaello_sanzio_da_urbino_-moses_saved_from_the_water.Jpg",
]

const style_pencil = [
    "https://images.template.net/wp-content/uploads/2015/08/23143236/Amazingly-Awesome-Pencil-Drawings.jpg?width=584",
    "https://www.pencilsketchportraits.co.uk/wp-content/uploads/2018/10/abbey-pencil-drawing-1030x736.jpg",
    "https://swall.teahub.io/photos/small/229-2290319_easy-pencil-sketches-of-i-love-you-easy.jpg",
    "https://i.pinimg.com/736x/2d/23/27/2d2327c022899e5ef17966044d14551c--the-hunger-game-thailand.jpg",
    "https://e.staedtlercdn.com/fileadmin/_processed_/b/4/csm_STAEDTLER_drawing-elk_step6_ac86a65e53.jpg"
]

const content_building = [
    "https://www.ubm-development.com/magazin/wp-content/uploads/2020/03/kl-main-building-d-Kopie.jpg",
    "https://seaonc-assets.s3.amazonaws.com/uploads/2018/04/mills.jpg",
    "https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.hpbmagazine.org/content/uploads/data-import/1acb98fe/BeachGreenDunesPhoto4-1024x693.jpg",
    "https://roadmap2050.report/static/files/photo-building.jpg",
    "https://www.greenbreporters.com/wp-content/uploads/2016/03/US-Capitol.jpg",
    "https://s3.eu-west-2.amazonaws.com/luxurylondon.co.uk-storage-bucket-001/images/230421114848/card/londons-most-contentious-buildings-tower-bridge-xl-hd.jpg"
]

const content_landscape = [
    "https://www.motosha.com/files/preview/1280x853/14135-rural-landscape-in-hattingen-by-north-rhine-westphalia-germany-on-a-cloudy-day.jpg",
    "https://agreenerworld.org/wp-content/uploads/2020/10/Windy-n-Ranch-900-x-600-directory.jpg",
    "https://d38zjy0x98992m.cloudfront.net/455c55cf-c378-45a2-89e4-9e9279ca49b8/1808190078_X_PALOUSE_WASHINGTON_uxga.jpg",
    "https://backlightblog.com/images/2021/04/landscape-photography-header.jpg",
    "https://images.squarespace-cdn.com/content/v1/5919021a1e5b6c940741bc9b/1576177860363-WGW3ZZ7WX7R5YOLMXZKJ/MT+TARANAKI+-+AGORAjpg.jpg",
    "https://www.gannett-cdn.com/presto/2022/03/08/NOAK/1488f7dc-38b1-4c5c-b179-503b613dac20-Sustainable_Landscaping_-_Ten_Eyck_Landscape_Architects_photo_credit.jpg"
]

const content_people = [
    "https://assets.weforum.org/article/image/XaHpf_z51huQS_JPHs-jkPhBp0dLlxFJwt-sPLpGJB0.jpg",
    "https://www.telegraph.co.uk/content/dam/tv/2020/04/27/TELEMMGLPICT000228841709_trans_NvBQzQNjv4BqYHaHRqZzVuMJAn8HN8r1s25xHFBv-aIg4TgE5NfOlH8.jpeg",
    "https://images.squarespace-cdn.com/content/v1/52e12a98e4b0bd0cf79bddf1/1434747011102-4KSMRE6Q6ZDQ6TRZDLHD/image-asset.jpeg?format=1000w",
    "https://www.properproof.com/photo/Images/gowin_edith_ruth.jpg",
    "https://images.squarespace-cdn.com/content/v1/5dba36512fd9c73b34f1790e/1572485375386-ZLOIHWY0GV6R8DYESXI1/BethesdaDayDream_sm-001.jpg",
    "https://backlightblog.com/images/2020/10/blur-photo-background-header.jpg"
]

const content_animal = [
    "https://www.allaboutbirds.org/guide/assets/photo/59859171-480px.jpg",
    "https://i.pinimg.com/originals/89/62/a1/8962a13d46e85840edfa4e51f6af15a2.jpg",
    "https://alfa-cat.com/catsimg/galileo335.jpg",
    "https://forum.chronofhorse.com/uploads/default/original/3X/4/a/4ad5a440dd8190e50618c971e39265022cae0c27.jpeg",
    "https://www.roeselienraimond.com/wp-content/uploads/2015/01/autumn_allow_deer_.jpg",
    "https://www.roeselienraimond.com/wp-content/uploads/2014/08/cute_white_rabbit1.jpg"
]

const popular_style = [
    "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/battle-1910-wassily-kandinsky.jpg",
    "https://images.fineartamerica.com/images-medium-large-5/another-world-moon-abstract-j-larry-walker.jpg",
    "https://media.architecturaldigest.com/photos/5c991cc56b6fbc66bc4dd3aa/16:9/w_2560%2Cc_limit/GettyImages-973792302.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/970px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "https://www.pencilsketchportraits.co.uk/wp-content/uploads/2018/10/abbey-pencil-drawing-1030x736.jpg",
    "https://previews.agefotostock.com/previewimage/medibigoff/9dc85fa1fd2c576a9c47766a94d5321c/x4j-2814005.jpg",
    "https://www.theartstory.org/images20/works/raphael_2.jpg",
    "https://images.fineartamerica.com/images-medium-large-5/chinese-landscape-sean-seal.jpg",
]

const popular_content = [
    "https://www.greenbreporters.com/wp-content/uploads/2016/03/US-Capitol.jpg",
    "https://www.properproof.com/photo/Images/gowin_edith_ruth.jpg",
    "https://www.gannett-cdn.com/presto/2022/03/08/NOAK/1488f7dc-38b1-4c5c-b179-503b613dac20-Sustainable_Landscaping_-_Ten_Eyck_Landscape_Architects_photo_credit.jpg",
    "https://s3.eu-west-2.amazonaws.com/luxurylondon.co.uk-storage-bucket-001/images/230421114848/card/londons-most-contentious-buildings-tower-bridge-xl-hd.jpg",
    "https://www.telegraph.co.uk/content/dam/tv/2020/04/27/TELEMMGLPICT000228841709_trans_NvBQzQNjv4BqYHaHRqZzVuMJAn8HN8r1s25xHFBv-aIg4TgE5NfOlH8.jpeg",
    "https://d38zjy0x98992m.cloudfront.net/455c55cf-c378-45a2-89e4-9e9279ca49b8/1808190078_X_PALOUSE_WASHINGTON_uxga.jpg",
    "https://iso.500px.com/wp-content/uploads/2014/07/Elliott-and-His-Hen-Cover-Image.jpg",
    "https://media.whas11.com/assets/WHAS/images/617108c8-b8e9-4fd1-b5f9-f640d6a01404/617108c8-b8e9-4fd1-b5f9-f640d6a01404_1920x1080.jpg"
]