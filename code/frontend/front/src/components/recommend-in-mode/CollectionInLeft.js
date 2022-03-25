import React, { useContext } from "react";
import { LoginContext } from "../../context/AuthProvider";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Image } from 'react-bootstrap';
import "../../bootstrap-4.3.1-dist/css/bootstrap.min.css";
// import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';

export default function CollectionInLeft(props) {
    var leftimg = props.leftSourceImg;
    console.log(props);
    console.log(leftimg);
    // const ref = createRef();
    const { soureimg, setSourceimg } = useContext(LoginContext);
    return (
        <>
            <Row className="ml-1 overflow-auto" style={{ height: "100vh" }}>
                {leftimg.map(item => {
                    return <Col key={item.name} xl={4} lg={6} sm={12} className="mt-3" onClick={() => setSourceimg(item.imgUrl)}>
                        <Image src={item.imgUrl} style={{ height: '83px', witdh: '83.px', objectFit: 'cover', maxHeight: '100vh' }} fluid alt="item.name" />
                    </Col>;
                })}
            </Row>
        </>
    );
}