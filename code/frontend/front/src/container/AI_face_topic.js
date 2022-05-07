import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CollectionInLeft from "../components/recommend-in-mode/CollectionInLeft";
import EditVideo from './EditVideo';


const tempimage = [
    { imgUrl: 'https://s1.r29static.com/bin/entry/43a/0,200,2000,2000/x,80/1536749/image.jpg', name: '01', topic: 'Star' },
    { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://stylesatlife.com/wp-content/uploads/2021/11/Emma-Watson-face-shape.jpg.webp', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://c4.wallpaperflare.com/wallpaper/485/848/917/actresses-mckenna-grace-actress-blonde-blue-eyes-hd-wallpaper-preview.jpg', name: '05', topic: 'Fashion' },
]
const leftData = [
    { imgUrl: 'https://media1.popsugar-assets.com/files/thumbor/0ebv7kCHr0T-_O3RfQuBoYmUg1k/475x60:1974x1559/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg', name: 'singers_1', topic: 'Singers' },
    { imgUrl: 'https://cdn.vox-cdn.com/thumbor/84BoAJ5wM2CSqDoaTOZNBnPDU4U=/0x0:2040x1360/1200x675/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/63940677/jbareham_190520_0907_got_0004.0.jpg', name: '04', topic: 'Game of Thrones' },
    { imgUrl: 'https://i.ytimg.com/vi/amFQpcDTPMQ/maxresdefault.jpg', name: 'meme_01', topic: 'Meme' },
    { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/980x691/gallery-1439716105-dan-radcliffe-rupert-grint-emma-watson.jpg?resize=480:*', name: '06', topic: 'Face' },
    { imgUrl: 'https://www.filmcompanion.in/wp-content/uploads/2020/07/film-comapnion-Joey-Lead-2.jpg', name: 'friends_1', topic: 'Friends' },
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg', name: 'movieStart_1', topic: 'Movie Stars' },
    { imgUrl: 'https://www.yourtango.com/sites/default/files/styles/body_image_default/public/jim-parsons.png?itok=yGyoNy7B', name: '10', topic: 'Face' },
    { imgUrl: 'https://p1-tt.byteimg.com/origin/pgc-image/a14ae6ab020544ffa9e7d257da14fc24.jpg', name: 'friends_2', topic: 'Friends' },
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg', name: 'movieStart_2', topic: 'Movie Stars' },
]

export const AI_face_topic = (props) => {

    return (
        <>
            <Row style={{ height: '100%' }}>
                <Col xs={3}>
                    < CollectionInLeft leftSourceImg={leftData} />
                </Col>
                <Col xs={9}>
                    <EditVideo imgData={tempimage} />
                </Col>
            </Row>
        </>
    );
};