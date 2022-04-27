import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Image } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import "../style/Gallery.css";
import { CommentOutlined, DeleteOutlined } from '@ant-design/icons';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import { Modal, Button } from 'antd';
import { Comment, Avatar, Form, List, Input, message } from 'antd';
import moment from 'moment';
import LikeBtn from '../components/LikeBtn'
import Video from '../components/Video';
import Masonry from 'react-masonry-css';

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

const Cardtransition = {
  type: "spring",
  damping: 10,
  stiffness: 100
}

function Gallery(probs) {
  const posts = probs.props
  const [cookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [itemP, setitemP] = useState({ content_url: "", user_avater: "", post_text: "", comment: null, post_id: "" });
  const handleChane = (e) => { setValue(e.target.value) };

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => (
        <>
          <Comment
            author={props.user_name}
            avatar={props.user_avater}
            content={<>
              {props.comment_content}
            </>}
            datetime={props.commenttime}
          >
            {props.reply ?
              props.reply.map((repo) => {
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
  const showModal = (e, name) => {
    setVisible(true);
    setitemP({
      user_avater: name.user_avater, post_text: name.post_text,
      content_url: name.content_url, comment: name.comment, post_id: name.post_id
    });
    if (name.comment != null) {
      setComments(name.comment)
      console.log(name.comment)
    } else {
      setComments([])
    }
  };
  const handleCancel = () => {
    setVisible(false)
  };
  const handleDelete = async (post_id, item) => {
    let url = "https://server-demo.ai-for-fun-backend.com/deletepost";
    console.log(JSON.stringify({
      'post_id': post_id,
      'user_id': cookie.user_id,
    }))
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'post_id': post_id,
        'user_id': cookie.user_id,
      })
    });
    if (response.status === 200) {
      // const content = await response.json();
      window.location.reload()
    }
    else {
      console.log('request failed', response);
      message.error('Failure');
    }
  }
  const handleLiked = async (likelist, post_id) => {
    let isLiked = likelist.indexOf(cookie.user_id)
    if (isLiked === -1) {
      let url = "https://server-demo.ai-for-fun-backend.com/likepost";
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'post_id': post_id,
          'user_id': cookie.user_id,
        })
      });
      if (response.status === 200) {
        // const content = await response.json();
      }
      else {
        console.log('request failed', response);
        message.error('Failure');
      }
    } else {
      let url = "https://server-demo.ai-for-fun-backend.com/unlikepost";
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'post_id': post_id,
          'user_id': cookie.user_id,
        })
      });
      if (response.status === 200) {
        // const content = await response.json();
      }
      else {
        console.log('request failed', response);
        message.error('Failure');
      }
    }
  }
  const handleSubmit = async () => {
    if (!cookie.name) {
      message.info("Please login first");
      return;
    }
    if (!value) {
      return;
    }
    setSubmitting(true);
    // comment
    let url = "https://server-demo.ai-for-fun-backend.com/createcomment";
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'postid': itemP.post_id,
        'commentcontent': value,
        'userid': cookie.user_id,
        'username': cookie.name,
        'useravater': cookie.avatar,
      })
    });
    if (response.status === 200) {
      // const content = await response.json();
      setSubmitting(false);
      setComments(
        [
          ...comments,
          {
            user_name: cookie.name,
            user_avater: cookie.avatar,
            comment_content: <p>{value}</p>,
            commenttime: moment().fromNow(),
          }
        ]
      )
    }
    else {
      console.log('request failed', response);
      message.error('Comment failure');
      setSubmitting(false);
    }
  }
  const breakpointColumnsObj = {
    default: 5,
    1800: 4,
    1300: 3,
    1000: 2,
    500: 1
  };

  return (
    <>
      <motion.div
        initial="hide"
        animate="show"
        variants={galleryAnimation}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((item) => {
            { console.log(item) }
            return <motion.div
              key={item._id}
              animate={{ y: [-5, 5, 0] }}
              transition={Cardtransition}
              whileHover={{ scale: 1.05 }}
              className="gallery"
            >
              <Card>
                {
                  item.content_url.includes("images") || item.content_url.includes("jpg") ?
                    <Card.Img as={Image} src={item.content_url} alt="item._id" />
                    :
                    <Video props={{ "videoSrc": item.content_url }} />
                }
                <Card.Body>
                  <Row>
                    <Col md={3} xs={3}>
                      <Card.Link href={"/userdetail/" + item.user_id}><Avatar src={item.user_avater} /></Card.Link>
                    </Col>
                    <Col md={9} xs={9}>
                      <p style={{ fontSize: "14px" }}> {item.post_text.substring(0, 40)} {item.post_text.length >= 40 && '...'}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} xs={5}>
                      <div style={{ float: "left", fontSize: "16px" }}
                        onClick={() => {
                          if (!cookie.name) {
                            message.error('login first');
                            return;
                          }
                          handleLiked(item.liked_time, item.post_id)
                          if (item.liked_time.indexOf(cookie.user_id) === -1) {
                            item.liked_time.push(cookie.user_id)
                          } else {
                            item.liked_time.pop(cookie.user_id)
                          }
                        }}
                      >
                        <LikeBtn props={{
                          "times": item.liked_time.length, "disable": !cookie.name,
                          "liked": (item.liked_time.indexOf(cookie.user_id) !== -1)
                        }}
                        />
                        {console.log(item.liked_time.indexOf(cookie.user_id) !== -1)}
                        <CommentOutlined className='ml-1' onClick={(ev) => { showModal(ev, item) }} />
                      </div>
                    </Col>
                    <Col md={8} xs={7} style={{ float: "right" }}>
                      {item.user_id === cookie.user_id ?
                        <a herf="#" style={{ fontSize: "16px", float: "right" }}><DeleteOutlined onClick={() => handleDelete(item.post_id, item)} /></a>
                        :
                        <></>
                      }
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </motion.div>
          })}

        </Masonry>
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
          {
            itemP.content_url.includes("images") || itemP.content_url.includes("jpg") ?
              <Image src={itemP.content_url} fluid />
              :
              <Video props={{ "videoSrc": itemP.content_url }} />
          }

          <p>{itemP.post_text}</p>
          <Comment
            avatar={<Avatar src={cookie.avatar} />}
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
          {console.log('comment', comments)}
        </Row>
      </Modal>
    </>
  )
}

export default Gallery;