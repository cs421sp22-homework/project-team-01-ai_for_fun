import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import "../style/ProfileHeader.css"
import React, { useState, useContext, useEffect } from 'react';
import { Image } from "react-bootstrap";
import Gallery from "../container/Community_home";
import FriendList from "./FriendList";
import { useCookies } from 'react-cookie';
import { motion } from 'framer-motion';

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
    useEffect(async()=>{
        let url_follow = 'https://server-demo.ai-for-fun-backend.com/getfollowinfo/' + user;
        let url_like = 'https://server-demo.ai-for-fun-backend.com/postlikeinfo/' + user;
        let url = 'https://server-demo.ai-for-fun-backend.com/getuserpost/' + user;
        const res_follow = await fetch(url_follow)
        const res_like = await fetch(url_like)
        if (res_follow.status == 200) {
            const fer = await res_follow.json();
            setFollowers(fer[0].follower_count)
            setfowlist(fer[0].follower_list)
            setfinglist(fer[0].followed_list)
            setFollowing(fer[0].followed_count)
        }
        if (res_like.status == 200) {
            const lk = await res_like.json();
            setLikes(lk[0].liked_sum)
        }
        const response = await fetch(url)
        console.log(response);
        if (response.status == 200) {
            const content = await response.json();
            setUserposts(content)
            setPostnum(content.length)
        }
        else {
          setUserposts([])
        }
    },[])
    return (
    <div className="container">
    <div className="row mt-3">
        <div className="panel profile-cover">
            <div className="profile-cover__img">
                <Image src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                <h3 className="h3">Henry Foster</h3>
            </div>
            <div className="profile-cover__action bg--img" data-overlay="0.3">
                <button className="btn btn-rounded btn-info">
                    <i className="fa fa-plus"></i>
                    <span>Follow</span>
                </button>
            </div>
            <div className="profile-cover__info">
                <ul className="nav">
                    <motion.li whileHover={{ scale: 1.05 }} onClick={()=>setCompid('post')}><strong>{postnum}</strong>Post</motion.li>
                    <motion.li whileHover={{ scale: 1.05 }} onClick={()=>setCompid('followers')}><strong>{followers}</strong>Followers</motion.li>
                    <motion.li whileHover={{ scale: 1.05 }} onClick={()=>setCompid('following')}><strong>{following}</strong>Following</motion.li>
                </ul>
            </div>
        </div>
    </div>
    <div className="row">
        {compid == 'post'? (
        <Gallery props={userposts}/>)
        : compid == 'followers'? (
          <FriendList props={fowlist}/>
        )
        :
        <FriendList props={finglist}/>
        }
    </div>
</div>
    )
  }
  
  export default ProfileHeader;