import React,{useContext} from "react";
import { LoginContext } from "../../context/AuthProvider";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Image} from 'react-bootstrap';
import "../../bootstrap-4.3.1-dist/css/bootstrap.min.css";
// import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';

export default function CollectionInLeft(props) {
    // const ref = createRef();
    const { soureimg, setSourceimg } = useContext(LoginContext);
    return (
        <>
        <Row className="ml-1 overflow-auto" style={{height:"100vh"}}>
        {tempimage.map(item => {
          return <Col key={item.name} xl={4} lg={6} sm={12} className="mt-3" onClick={()=> setSourceimg(item.imgUrl)}>
              <Image src={item.imgUrl} fluid alt="item.name" />
          </Col>;
        })}
        </Row>
        </>
    );
}

const tempimage = [
    { imgUrl: './img/01.png', name: '01', topic: 'Star' },
    { imgUrl: './img/02.png', name: '02', topic: 'House' },
    { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '06', topic: 'Face' },
    { imgUrl: './img/07.png', name: '07', topic: 'Good' },
    { imgUrl: './img/01.png', name: '08', topic: 'Star' },
    { imgUrl: './img/02.png', name: '09', topic: 'House' },
    { imgUrl: './img/03.png', name: '10', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '11', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '12', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '13', topic: 'Face' },
    { imgUrl: './img/07.png', name: '14', topic: 'Good' },
    { imgUrl: './img/07.png', name: '15', topic: 'Good' },
    { imgUrl: './img/01.png', name: '16', topic: 'Star' },
    { imgUrl: './img/02.png', name: '17', topic: 'House' },
    { imgUrl: './img/03.png', name: '18', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '19', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '20', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '21', topic: 'Face' },
    { imgUrl: './img/07.png', name: '22', topic: 'Good' },
    { imgUrl: './img/01.png', name: '23', topic: 'Star' },
    { imgUrl: './img/02.png', name: '24', topic: 'House' },
    { imgUrl: './img/03.png', name: '25', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '26', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '27', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '28', topic: 'Face' },
    { imgUrl: './img/07.png', name: '29', topic: 'Good' },
    { imgUrl: './img/01.png', name: '30', topic: 'Star' },
    { imgUrl: './img/02.png', name: '31', topic: 'House' },
    { imgUrl: './img/03.png', name: '32', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '33', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '34', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '35', topic: 'Face' },
    { imgUrl: './img/07.png', name: '36', topic: 'Good' },
    { imgUrl: './img/07.png', name: '37', topic: 'Good' },
    { imgUrl: './img/01.png', name: '38', topic: 'Star' },
    { imgUrl: './img/02.png', name: '39', topic: 'House' },
    { imgUrl: './img/03.png', name: '40', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '41', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '42', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '43', topic: 'Face' },
    { imgUrl: './img/07.png', name: '44', topic: 'Good' }
]
