import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import "../style/Widget.css"
import React, { useState, useContext, useEffect } from 'react';
import { Image } from "react-bootstrap";
import { useCookies } from 'react-cookie';

function Widget(props) {
    const userinfo = props.props
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [likes, setLikes] = useState(0)
    useEffect(async()=>{
        let url = 'https://server-demo.ai-for-fun-backend.com/getuserpost/' + userinfo;
        const response = await fetch(url)
        console.log(response);
        if (response.status == 200) {
            const content = await response.json();
            setFollowers(content)
            setFollowing(content)
        }
    },[])
    return (
        <div className="col-md-4">
        <div className="box box-widget widget-user">
          <div className="widget-user-header bg-yellow">
            <h3 className="widget-user-username">Alexander Pierce</h3>
            <h5 className="widget-user-desc">Founder &amp; CEO</h5>
          </div>
          <div className="widget-user-image">
            <img className="img-circle" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="User Avatar"/>
          </div>
          <div className="box-footer">
            <div className="row">
              <div className="col-sm-4 border-right">
                <div className="description-block">
                  <h5 className="description-header">3,200</h5>
                  <span className="description-text">SALES</span>
                </div>
              </div>
              <div className="col-sm-4 border-right">
                <div className="description-block">
                  <h5 className="description-header">13,000</h5>
                  <span className="description-text">FOLLOWERS</span>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="description-block">
                  <h5 className="description-header">35</h5>
                  <span className="description-text">PRODUCTS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
  }
  
  export default Widget;