import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import "../style/Widget.css"
import React, { useState, useContext, useEffect } from 'react';
import { Image, Card } from "react-bootstrap";
import { useCookies } from 'react-cookie';

function Widget(props) {
  const userinfo = props.props
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [likes, setLikes] = useState(0)
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  useEffect(async () => {
    let url = 'https://server-demo.ai-for-fun-backend.com/userbasicinfo/' + userinfo;
    const response = await fetch(url)
    console.log(response);
    if (response.status == 200) {
      const content = await response.json();
      setUsername(content.name)
      setAvatar(content.avatar)
    }
    let url3 = 'https://server-demo.ai-for-fun-backend.com/postlikeinfo/' + userinfo;
    let url2 = 'https://server-demo.ai-for-fun-backend.com/getfollowinfo/' + userinfo;
    const response3 = await fetch(url3)
    const response2 = await fetch(url2)
    if (response3.status == 200) {
      const content3 = await response3.json();
      setLikes(content3[0].liked_sum)
      console.log(content3)
    }
    else {
      console.log('request failed', response.body);
      setLikes(0)
    }
    if (response2.status == 200) {
      const content2 = await response2.json();
      setFollowers(content2[0].follower_count)
      setFollowing(content2[0].followed_count)
      console.log(content2)
    }
  }, [])
  const redirectlink = "/userdetail/" + userinfo
  return (
    <Card.Link href={redirectlink} style={{ 'textDecoration': 'none', 'color': 'black' }}>
      <div className="row">
        <div className="box box-widget widget-user">
          <div className="widget-user-header bg-blue">
            <h3 className="widget-user-username">{username}</h3>
          </div>
          <div className="widget-user-image">
            <img className="img-circle" src={avatar} alt="User Avatar" />
            {/* <img className="img-circle" src="https://i.pravatar.cc/" alt="User Avatar"/> */}
          </div>
          <div className="box-footer">
            <div className="row">
              <div className="col-sm-4 border-right">
                <div className="description-block">
                  <h5 className="description-header">{likes}</h5>
                  <span className="description-text">Likes</span>
                </div>
              </div>
              <div className="col-sm-4 border-right">
                <div className="description-block">
                  <h5 className="description-header">{followers}</h5>
                  <span className="description-text">FOLLOWERS</span>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="description-block">
                  <h5 className="description-header">{following}</h5>
                  <span className="description-text">FOLLOWING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card.Link>
  )
}

export default Widget;