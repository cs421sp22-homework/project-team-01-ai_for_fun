import React from "react";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { List } from 'antd';
import Card from 'react-bootstrap/Card';

export default function CollectionInLeft() {
    return (
        <Card border="light" style={{ width: '100%' }}>
            <Card.Header>recommend to you</Card.Header>
            <Card.Body>
                <List
                    style={{
                        height: '100%',
                        width: '100%',
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}

                    grid={{ gutter: 16, column: 3 }}
                    dataSource={tempimage}
                    renderItem={item => (
                        <List.Item>
                            <Card>
                                <Card.Img variant="top" src={item.imgUrl} />
                            </Card>
                        </List.Item>
                    )}
                />
            </Card.Body>
        </Card>
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
    { imgUrl: './img/07.png', name: '14', topic: 'Good' }
]