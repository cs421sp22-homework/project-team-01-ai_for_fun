import React, { useEffect, useState } from "react";
import RightSidebar from "../components/RightSider";
import Feed from "../components/Feed";
import { Row, Col } from 'react-bootstrap';
import { useCookies } from 'react-cookie';


function YourPost() {
  useEffect(() => {
    document.title = "Ifun-Community";
  }, []);
  const [cookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    let url = 'https://server-demo.ai-for-fun-backend.com/getuserpost/' + cookie.user_id;
    const response = await fetch(url)
    console.log(response);
    if (response.status === 200) {
      const content = await response.json();
      setPosts(content)
    }
    else {
      setPosts([])
    }
  }, [])
  return (
    <Row>
      <Col md={3} xxl={2} className="ml-2">
        <RightSidebar />
      </Col>
      <Col md={8} xxl={9} className="mt-4">
        <Feed
          isExplore={false}
          isLibrary={false}
          isYourPosts={posts}
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