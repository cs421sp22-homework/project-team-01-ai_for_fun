import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import "../style/ProfileHeader.css"
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Image } from "react-bootstrap";
import Gallery from "../container/Community_home";
import FriendList from "./FriendList";
import { useCookies } from 'react-cookie';
import { motion } from 'framer-motion';
import { message } from 'antd';

function ProfileHeader() {
  const user = window.location.pathname.split("/")[2]
  const [compid, setCompid] = useState('post')
  const [cookie, setCookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])
  const [userposts, setUserposts] = useState([])
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [likes, setLikes] = useState(0)
  const [fowlist, setfowlist] = useState([])
  const [finglist, setfinglist] = useState([])
  const [postnum, setPostnum] = useState(0)
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [followstate, setFollowstate] = useState(false)

  useEffect(async () => {
    let url_follow = 'https://server-demo.ai-for-fun-backend.com/getfollowinfo/' + user;
    let url_like = 'https://server-demo.ai-for-fun-backend.com/postlikeinfo/' + user;
    let url = 'https://server-demo.ai-for-fun-backend.com/getuserpost/' + user;
    let url_state = 'https://server-demo.ai-for-fun-backend.com/isfollowed';

    if (cookie.user_id) {
      const response_state = await fetch(url_state, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "follower_id": cookie.user_id,
          "followed_id": user
        })
      });
      if (response_state.status === 200) {
        const fer = await response_state.json();
        if (fer.res === 1) {
          setFollowstate(true)
        } else {
          setFollowstate(false)
        }
      }
    }

    let url_info = 'https://server-demo.ai-for-fun-backend.com/userbasicinfo/' + user;
    const response_info = await fetch(url_info)
    if (response_info.status === 200) {
      const content_info = await response_info.json();
      console.log(content_info)
      setUsername(content_info.name)
      setAvatar(content_info.avatar)
    }


    const res_follow = await fetch(url_follow)
    const res_like = await fetch(url_like)
    if (res_follow.status === 200) {
      const fer = await res_follow.json();
      setFollowers(fer[0].follower_count)
      setfowlist(fer[0].follower_list)
      setfinglist(fer[0].followed_list)
      setFollowing(fer[0].followed_count)
    }
    if (res_like.status === 200) {
      const lk = await res_like.json();
      setLikes(lk[0].liked_sum)
    }
    const response = await fetch(url)
    if (response.status === 200) {
      const content = await response.json();
      setUserposts(content)
      setPostnum(content.length)
    }
    else {
      setUserposts([])
    }
  }, [])

  if (cookie.user_id === user){
    return <Navigate to="/profile" />
  }
  const handleFollow = async () => {
    if (cookie.user_id) {
      let url = 'https://server-demo.ai-for-fun-backend.com/follow'

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "follower_id": cookie.user_id,
          "followed_id": user
        })
      });

      if (response.status === 200) {
        const content = await response.json();
        setFollowstate(true)
      }
      else {
        message.error('request failure')
      }
    } else {
      message.error('Login first')
    }
  }
  const handleUnFollow = async () => {
    if (cookie.user_id) {
      let url = 'https://server-demo.ai-for-fun-backend.com/unfollow'

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "follower_id": cookie.user_id,
          "followed_id": user
        })
      });

      if (response.status === 200) {
        const content = await response.json();
        setFollowstate(false)
      }
      else {
        message.error('request failure')
      }
    } else {
      message.error('Login first')
    }
  }
  return (
    <div className="container" style={{marginTop:100}}>
      <div className="row mt-3">
        <div className="panel profile-cover">
          <div className="profile-cover__img">
            <Image src={avatar} alt="" />
            <h3 className="h3">{username}</h3>
          </div>
          <div className="profile-cover__public bg--img" data-overlay="0.3" >
            {!followstate ?
              <button className="btn btn-rounded btn-info" onClick={handleFollow}>
                <i className="fa fa-plus"></i>
                <span>Follow</span>
              </button>
              :
              <button className="btn btn-rounded btn-info" onClick={handleUnFollow}>
                <i className="fa fa-plus"></i>
                <span>Unfollow</span>
              </button>
            }
          </div>
          <div className="profile-cover__info">
            <ul className="nav">
              {compid === 'post' ? (
                <>
                  <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('post')} style={{ "fontWeight": "bolder" }}><strong>{postnum}</strong><p >Post</p></motion.li>
                  <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('followers')}><strong>{followers}</strong>Followers</motion.li>
                  <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('following')}><strong>{following}</strong>Following</motion.li>
                </>
              )
                : compid === 'followers' ? (
                  <>
                    <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('post')}><strong>{postnum}</strong>Post</motion.li>
                    <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('followers')} style={{ "fontWeight": "bolder" }}><strong>{followers}</strong>Followers</motion.li>
                    <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('following')}><strong>{following}</strong>Following</motion.li>
                  </>
                )
                  :
                  <>
                    <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('post')}><strong>{postnum}</strong>Post</motion.li>
                    <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('followers')}><strong>{followers}</strong>Followers</motion.li>
                    <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('following')} style={{ "fontWeight": "bolder" }}><strong>{following}</strong>Following</motion.li>
                  </>
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        {compid === 'post' ? (
          <Gallery props={userposts} />)
          : compid === 'followers' ? (
            <FriendList props={fowlist} />
          )
            :
            <FriendList props={finglist} />
        }
      </div>
    </div>
  )
}

export default ProfileHeader;