import React, { useEffect, useState } from "react";
import RightSidebar from "../components/RightSider";
import Feed from "../components/Feed";
import {Row, Col} from 'react-bootstrap';
import { useCookies } from 'react-cookie';

function FollowerPost() {
  useEffect(() => {
    document.title = "Ifun-Community";
  }, []);
  const [cookie, setCookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])
  const [posts, setPosts]=useState([]);
  useEffect(async()=>{
        let url = 'https://server-demo.ai-for-fun-backend.com/topkpost';
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "sorttype":"likeNumber",
                "k":15
            })
          });
        console.log(response);
        if (response.status == 200) {
            const content = await response.json();
            console.log('wowo',content)
            setPosts(content)
        }
        else {
          setPosts([])
        }
    },[])
  return (
    <Row>
      <Col md={3} xxl={2} className="ml-2">
        <RightSidebar />
      </Col>
      <Col md = {8} xxl={9} className="mt-4">
        <Feed
          isExplore={false}
          isLibrary={posts}
          isYourPosts={false}
          isSearch={false}
          isProfile={false}
          isFollower={false}
          homePosts={false}
        />
      </Col>
    </Row>
  );
};

export default FollowerPost;