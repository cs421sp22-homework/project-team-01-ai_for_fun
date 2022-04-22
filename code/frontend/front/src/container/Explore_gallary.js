import {motion} from 'framer-motion';
import Macy from 'macy';
import React,{useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import data from '../data/gallery.json';
import { Image } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "../style/Gallery.css";
import {LikeOutlined,CommentOutlined,ArrowRightOutlined} from '@ant-design/icons';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import {Modal, Button} from 'antd';
import { Comment, Avatar, Form, List, Input, message } from 'antd';
import moment from 'moment';

const { TextArea } = Input;



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

function Gallery(probs) {
    const posts = probs.props
    useEffect(()=>{
        new Macy(macyOptions)
    },[])
    const [visible, setVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [itemP, setitemP] = useState({content_url:"",user_avater:"",post_text:"",comment:null,post_id:""});
    const handleChane = (e) => {setValue(e.target.value)};
    const navigate = useNavigate();

    const CommentList = ({ comments }) => (
      <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => (
        <>
        <Comment 
          author={itemP.user_name}
          avatar={itemP.user_avater}
          content={props.commentcontent}
          datetime={props.commenttime}
        >
        {props.reply? 
        props.reply.map((repo)=>{
          return <Comment 
          key={repo.userid}
          author={repo.username}
          avatar={repo.useravater}
          content={repo.replycontent}
          datetime={repo.replytime}
        ></Comment>
        })
        :
        <></>
        }
        
        </Comment>
        </>
          )}
      />
    );
    const showModal = (e,name) => {
        setVisible(true);
        setitemP({user_avater:name.user_avater, post_text:name.post_text,
           content_url:name.content_url,comment:name.comment,post_id:name.post_id});
        if (name.comment != null){
          setComments(name.comment)
        } else {
          setComments([])
        }
      };
    const handleCancel = () => {
        setVisible(false)
      };
    const [cookie, setCookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])
    const handleSubmit = async () =>{
        if (!cookie.user_id){
          message.info("Please login first");
          return;
        }
        if (!value) {
            return;
          }
          setSubmitting(true);
          // comment
          // let url = "https://server-demo.ai-for-fun-backend.com/createcomment";
          // const response = await fetch(url, {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     'postid': itemP.postid,
          //     'commentcontent': value,
          //     'userid': cookie.user_id,
          //     'username': cookie.name,
          //     'useravater': cookie.avatar,
          //   })
          // });
          // if (response.status == 200) {
          //   const content = await response.json();
          //   setSubmitting(false);
          //   setComments(
          //     [
          //       ...comments,
          //       {
          //         user_name: 'Han Solo',
          //         user_avater: 'https://joeschmoe.io/api/v1/random',
          //         commentcontent: <p>{value}</p>,
          //         commenttime: moment().fromNow(),
          //       }
          //     ]
          //   )
          // }
          // else {
          //   console.log('request failed', response);
          //   setErrMsg('Wrong Email or Password');
          // }

          setTimeout(() => {
              setSubmitting(false);
              setComments([
                ...comments,
                {
                  user_name: 'Han Solo',
                  user_avater: 'https://joeschmoe.io/api/v1/random',
                  commentcontent: <p>{value}</p>,
                  commenttime: moment().fromNow(),
                },
              ]);
              setValue('');
          }, 1000);
    }
    return (
      <>
      {console.log(probs)}
        <motion.div>
            <motion.ul
            id="macy-grid"
            initial="hide"
            animate="show"
            variants={galleryAnimation}
            >
            {posts.map((item) => {
                return <motion.li 
                key={item._id} 
                variants={cardAnimation} 
                whileHover={{ scale: 1.05 }} 
                className="gallery"
                >
                    <Card.Img as={Image} src={item.content_url}  alt="item._id" />
                    <Card.Body>
                    <Row>
                    <Col md={3} xs={3}>
                    <Avatar src={cookie.avatar} alt="Han Solo" 
                      cursor="pointer"
                      onClick={() => {
                        navigate("/profile/" + cookie.name);
                      }}
                    />

                    </Col>
                    <Col md={9} xs={9}>
                    <p style={{fontSize:"14px"}}> {item.post_text.substring(0, 40)} {item.post_text.length >= 40 && '...'}</p>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={4} xs={5}>
                    <div style={{float:"left",fontSize:"16px"}}>
                    <LikeOutlined />
                    {item.liked_time}
                    <CommentOutlined className='ml-1'onClick={(ev) => {showModal(ev, item)}}/>
                    </div>
                    </Col>
                    <Col md={8} xs={7} style={{float:"right"}}>
                    <a herf="#" style={{fontSize:"16px",float:"right"}}><ArrowRightOutlined onClick={(ev) => {showModal(ev, item)}}/></a>
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
                  <Avatar src={itemP.user_avater} alt="Han Solo" />
              }
                onCancel={handleCancel}
                footer={null}
                >
                <Row>
                <Image src={itemP.content_url} fluid/>
                <p>{itemP.post_text}</p>
                <Comment
                    avatar={<Avatar src={itemP.user_avater}/>}
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