import React, { useState, mountNode } from 'react';
import SlideshowInMode from "./SlideshowInMode";
import Card from 'react-bootstrap/Card'

const tempimage = [
    { imgUrl: './img/01.png', name: '01', topic: 'Star' },
    { imgUrl: './img/02.png', name: '02', topic: 'House' },
    { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '06', topic: 'Face' },
    { imgUrl: './img/07.png', name: '07', topic: 'Good' },
]

const SlidesShowInLeft = () => {
    const { soureimg, setSourceimg } = useContext(LoginContext);

    return (
        <Card style={{ background: 'White', height: '100%' }} >
            <Card.Header as="h5">For you</Card.Header>
            <Card.Body>
                <SlideshowInMode imgData={tempimage} />
            </Card.Body>
            <Card.Header as="h5">Trend</Card.Header>
            <Card.Body>
                <SlideshowInMode imgData={tempimage} />
            </Card.Body>
            <Card.Header as="h5">Sport</Card.Header>
            <Card.Body>
                <SlideshowInMode imgData={tempimage} />
            </Card.Body>
        </Card>
    );
};

export default SlidesShowInLeft;

