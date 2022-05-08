import {
    Flex,
    Heading,
  } from "@chakra-ui/react";
  import React from "react";
  import Gallery from "../container/Community_home";
  
  const Feed = (props) => {
    return props.isLibrary ? (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="100%"
        position="sticky"
        style={{marginTop:70}}
        height="max-content"
      >
         <Gallery props={props.isLibrary}/>
      </Flex>
    ) : props?.isYourPosts ? (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="100%"
        position="sticky"
        top="5.4rem"
        height="max-content"
      >
        <Heading as="h4" size="md">
          Your posts
        </Heading>
        {console.log(props.isYourPosts)}
        <Gallery props={props.isYourPosts}/>
      </Flex>
    ) : props?.isFollower ? (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="100%"
        position="sticky"
        ç
        height="max-content"
      >
         <Gallery props={props.isFollower}/>
      </Flex>
    ) : (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="100%"
        position="sticky"
        height="max-content"
      >
          <Gallery props={props.homePosts}/>
      </Flex>
    );
  };
  
  export default Feed;