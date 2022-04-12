import React, { Fragment, useState, PureComponent } from "react";
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Slideshow from "../components/Slideshow";
import SlideshowInMode from "../components/recommend-in-mode/SlideshowInMode";
import Card from 'react-bootstrap/Card'
import UploadPic from '../components/UploadPic';
// import '../style/Slideshow.css';
// import '../style/sider.css';
// import UploadFile from "../components/UploadFile";
// import FaceResult from "../components/FaceResult";
import SlidesShowInLeft from "../components/recommend-in-mode/SlidesShowInLeft";
import CollectionInLeft from "../components/recommend-in-mode/CollectionInLeft";
import Video from '../components/Video';
import UploadFace from '../components/UploadFace';
import EditStyle from './EditStyle';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,

} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const tempvideo = {
    videoSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}

const tempimage = [
    { imgUrl: 'https://s1.r29static.com/bin/entry/43a/0,200,2000,2000/x,80/1536749/image.jpg', name: '01', topic: 'Star' },
    { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://stylesatlife.com/wp-content/uploads/2021/11/Emma-Watson-face-shape.jpg.webp', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://c4.wallpaperflare.com/wallpaper/485/848/917/actresses-mckenna-grace-actress-blonde-blue-eyes-hd-wallpaper-preview.jpg', name: '05', topic: 'Fashion' },
]
const leftData = [
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/candy.jpg?token=GHSAT0AAAAAABRYH3MF2WLJO4BR34PWCBTYYSWBAEQ', name: 'singers_1', topic: 'Sytle' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/Robert_Delaunay%2C_1906%2C_Portrait.jpg?token=GHSAT0AAAAAABRYH3MESSJBMLCX2QNO6TXQYSWBBLA', name: '04', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/composition_vii.jpg?token=GHSAT0AAAAAABRYH3MFVB63ETPCR6LSFGGSYSWBB4Q', name: 'meme_01', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/escher_sphere.jpg?token=GHSAT0AAAAAABRYH3ME5TAYK54BMGQ3JS7KYSWBCRQ', name: '06', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/feathers.jpg?token=GHSAT0AAAAAABRYH3MECEAFXNVAC4UTD7P6YSWBC2Q', name: '07', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/frida_kahlo.jpg?token=GHSAT0AAAAAABRYH3MFR76KTAGGPCCGF5L2YSWBDSA', name: '08', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/la_muse.jpg?token=GHSAT0AAAAAABRYH3MFREIZ6NT4PNGJPP4AYSWBDZQ', name: '09', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/mosaic.jpg?token=GHSAT0AAAAAABRYH3MFDPMJQXCW3TDTOPIWYSWBF6Q', name: '10', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/mosaic_ducks_massimo.jpg?token=GHSAT0AAAAAABRYH3MEV5SBZQWYJOPNTR3UYSWBGDQ', name: '11', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/pencil.jpg?token=GHSAT0AAAAAABRYH3MEKHNQFXLONR7OQM5OYSWBGSA', name: '12', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/picasso_selfport1907.jpg?token=GHSAT0AAAAAABRYH3MF5WSXLU7W6BWNVCWKYSWBGZQ', name: '13', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/rain_princess.jpg?token=GHSAT0AAAAAABRYH3MF33TDYASIEG6NJKJAYSWBHAQ', name: '14', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/seated-nude.jpg?token=GHSAT0AAAAAABRYH3MEZDMRDK2AGA7MMYUKYSWBHWA', name: '15', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/shipwreck.jpg?token=GHSAT0AAAAAABRYH3MFSHLN6VSAFULVX22AYSWBH7Q', name: '16', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/starry_night.jpg?token=GHSAT0AAAAAABRYH3MEPDK6R4FMWGMFBC4CYSWBIIA', name: '17', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/stars2.jpg?token=GHSAT0AAAAAABRYH3MEKNC3AV3BHEV5K7ZMYSWBIPA', name: '18', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/strip.jpg?token=GHSAT0AAAAAABRYH3MFUSOFYDSPNSWPOQN6YSWBIUQ', name: '19', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/the_scream.jpg?token=GHSAT0AAAAAABRYH3MEK7NNKWR52ZD4QDRUYSWBI2Q', name: '20', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/udnie.jpg?token=GHSAT0AAAAAABRYH3MFP4SGT3QUDEJRDIHKYSWBJBA', name: '21', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/wave.jpg?token=GHSAT0AAAAAABRYH3MENIA5EY4CKD3JVLL4YSWBJHA', name: '22', topic: 'Style' },
    { imgUrl: 'https://raw.githubusercontent.com/cs421sp22-homework/project-team-01-ai_for_fun/iter-04-backend/code/ai-compute-sever/StyleTransfer/images/21styles/woman-with-hat-matisse.jpg?token=GHSAT0AAAAAABRYH3MFH6KTU7WQIIFOMOZ4YSWBJPA', name: '23', topic: 'Style' },
    // { imgUrl: '', name: '24', topic: 'Style' },
    // { imgUrl: '', name: '25', topic: 'Style' },

]

export const AI_style = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    // const { leftData } = tempimage_1;
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
            <Row style={{ height: '100%' }}>
                <Col xs={3}>
                    < CollectionInLeft leftSourceImg={leftData} />
                </Col>
                <Col xs={9}>
                    <EditStyle imgData={tempimage} />
                </Col>
            </Row>
        </>
    );
};