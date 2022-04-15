import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import "../style/ProfileHeader.css"
import React, { useState, useContext, useEffect } from 'react';
import { Image } from "react-bootstrap";
import Gallery from "../container/Community_home";
import { useCookies } from 'react-cookie';

function ProfileHeader(props) {
    const userinfo = props.props
    const [compid, setCompid] = useState('post')
    const [cookie, setCookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])
    const [userposts, setUserposts] = useState([])
    useEffect(async()=>{
        let url = 'https://server-demo.ai-for-fun-backend.com/getuserpost/' + cookie.user_id;
        const response = await fetch(url)
        console.log(response);
        if (response.status == 200) {
            const content = await response.json();
            setUserposts(content)
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
                    <li><strong>26</strong>Post</li>
                    <li><strong>33</strong>Followers</li>
                    <li><strong>136</strong>Following</li>
                </ul>
            </div>
        </div>
    </div>
    <div className="row">
        {compid == 'post'? (
        <Gallery props={userposts}/>)
        : compid == 'followers'? (
            <></>
        )
        :
        <></>
        }
    </div>
</div>
    )
  }
  
  export default ProfileHeader;