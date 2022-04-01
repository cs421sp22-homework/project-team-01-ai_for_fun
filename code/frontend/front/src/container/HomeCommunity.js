import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RightSidebar from "../components/RightSider";
import Feed from "../components/Feed";
import {Row, Col} from 'react-bootstrap';
// import Loader from "../components/Loader";

function Community_home() {
  const toast = useToast();
  useEffect(() => {
    document.title = "OnlyUwU";
  }, []);
  const [posts, setPosts] = useState([]);
//   const postsRef = collection(db, "posts");
//   const q = query(postsRef, orderBy("createdAt", "desc"));
  const getPosts = async () => {

  };
  useEffect(() => {
    getPosts();
  }, []);
  if (posts?.length === 0) {
    // return <Loader />;
  }
  return (
    <Row>

      <Col md={3} xxl={2} className="ml-2">
        <RightSidebar />
      </Col>
      <Col md = {8} xxl={9} className="mt-4">
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