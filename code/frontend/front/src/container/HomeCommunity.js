import React, { useEffect, useState } from "react";
import RightSidebar from "../components/RightSider";
import Feed from "../components/Feed";
import { Row, Col } from 'react-bootstrap';
import Loader from "../components/Loader";

function Community_home() {
  useEffect(() => {
    document.title = "Ifun-Community";
  }, []);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let url = 'https://server-demo.ai-for-fun-backend.com/getpost';
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => { setPosts(result); console.log('yes', result) }
      )
  }, [])
  if (posts?.length === 0) {
    return <Loader />;
  }
  return (
    <Row>
      <Col md={3} xxl={2} className="ml-2">
        <RightSidebar />
      </Col>
      <Col md={8} xxl={9} style={{ marginTop: 100 }}>
        <Feed
          isExplore={false}
          isLibrary={false}
          isYourPosts={false}
          isSearch={false}
          isProfile={false}
          isFollower={false}
          homePosts={posts}
        />
      </Col>
    </Row>
  );
};

export default Community_home;