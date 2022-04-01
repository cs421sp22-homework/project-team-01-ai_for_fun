import {motion} from 'framer-motion';
import Macy from 'macy';
import React,{useEffect, useState} from 'react';
import data from '../data/data.json';
import { Image } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import "../style/Gallery.css";
import {LikeOutlined,CommentOutlined,ArrowRightOutlined} from '@ant-design/icons';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import {Modal, Button} from 'antd';
import { Comment, Avatar, Form, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

const macyOptions = {
    container: '#macy-grid',
    trueOrder: true,
    mobileFirst: true,
    margin: 23,
    columns: 1,
    breakAt: {
      1400: 4,
      1000: 3,
      650: {
        margin: 40,
        columns: 2,
      },
    },
  }

const galleryAnimation = {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        ease: 'easeOut',
        delayChildren: 1.5,
      },
    },
  }

const cardAnimation = {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  }

function Gallery() {
    useEffect(()=>{
        new Macy(macyOptions)
    },[])
    const info = "This is a template text which is used to test";
    const [visible, setVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [imgId, setImgId] = useState('');
    const handleChane = e => {setValue(e.target.value)}
    const showModal = (e,name) => {
        setVisible(true);
        setImgId(name);
      };
    const handleCancel = () => {
        setVisible(false)
      };
    const handleSubmit = () =>{
        if (!value) {
            return;
          }
      
          setSubmitting(true);
      
          setTimeout(() => {
              setSubmitting(false);
              setValue('');
              setComments([
                ...comments,
                {
                  author: 'Han Solo',
                  avatar: 'https://joeschmoe.io/api/v1/random',
                  content: <p>{value}</p>,
                  datetime: moment().fromNow(),
                },
              ]);
          }, 1000);

    }
    return (
      <>
        <motion.div>
            <motion.ul
            id="macy-grid"
            initial="hide"
            animate="show"
            variants={galleryAnimation}
            >
            {data.map((item) => {
                return <motion.li 
                key={item.name} 
                variants={cardAnimation} 
                whileHover={{ scale: 1.05 }} 
                className="gallery"
                >
                    <Card.Img as={Image} src={item.imgUrl}  alt="item.name" />
                    <Card.Body>
                    <Row>
                    <Col md={3} xs={3}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                    </Col>
                    <Col md={9} xs={9}>
                    <p style={{fontSize:"14px"}}> {info.substring(0, 40)} {info.length >= 40 && '...'}</p>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={4} xs={5}>
                    <div style={{float:"left",fontSize:"16px"}}>
                    <LikeOutlined />
                    <CommentOutlined className='ml-1'onClick={(ev) => {showModal(ev, item.imgUrl)}}/>
                    </div>
                    </Col>
                    <Col md={8} xs={7} style={{float:"right"}}>
                    <a herf="#" style={{fontSize:"16px",float:"right"}}><ArrowRightOutlined onClick={(ev) => {showModal(ev, item.imgUrl)}}/></a>
                    </Col>
                    </Row>
                    </Card.Body>
                </motion.li>
            })}
            </motion.ul>
        </motion.div>
        <Modal
                        visible={visible}
                        title={
                            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                        }
                        onCancel={handleCancel}
                        footer={null}
                        >
                            <Row>
                            <Image src={imgId} fluid/>
                            <p>{info}</p>
                            <Comment
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                            content={
                                <Editor
                                onChange={handleChane}
                                onSubmit={handleSubmit}
                                submitting={submitting}
                                value={value}
                                />
                            }
                            />
                            {comments.length > 0 && <CommentList comments={comments} />}
                            </Row>
                    </Modal>
                    </>
    )
} 

export default Gallery;