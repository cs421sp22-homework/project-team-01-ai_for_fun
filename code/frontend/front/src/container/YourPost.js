import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RightSidebar from "../components/RightSider";
import Feed from "../components/Feed";
import {Row, Col} from 'react-bootstrap';
import Loader from "../components/Loader";
import { useCookies } from 'react-cookie';


function YourPost() {
  useEffect(() => {
    document.title = "Ifun-Community";
  }, []);
  const [cookie, setCookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])
  const [posts, setPosts]=useState([]);
  useEffect(()=>{
    let url = 'https://server-demo.ai-for-fun-backend.com/getuserpost/:'+cookie.user_id;
    fetch(url)
        .then(res => res.json())
        .then(
        (result) => {
            if (result){
                setPosts(result)
            }else{
                setPosts([])
            }
        }
        )
    },[])
  return (
    <Row>
      <Col md={3} xxl={2} className="ml-2">
        <RightSidebar />
      </Col>
      <Col md = {8} xxl={9} className="mt-4">
        <Feed
          isExplore={false}
          isLibrary={false}
          isYourPosts={{"bool":true,"posts":posts}}
          isSearch={false}
          isProfile={false}
          isFollower={false}
          homePosts={false}
        />
      </Col>
    </Row>
  );
};

export default YourPost;