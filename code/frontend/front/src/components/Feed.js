import {
    Avatar,
    Divider,
    Flex,
    Heading,
    Image,
    Tag,
    Tooltip,
    useToast,
  } from "@chakra-ui/react";
  import React from "react";
  import Post from "./Post";
  import { useNavigate } from "react-router-dom";
  import Gallery from "../container/Community_home";
  
  const Feed = (props) => {
    const toast = useToast();
    const navigate = useNavigate();
    return props?.isExplore ? (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="100%"
        position="sticky"
        top="5.4rem"
        height="max-content"
      >
        <Heading as="h4" size="md">
          Trending posts
        </Heading>
        {props?.explorePosts?.map((post, index) => (
          <Post key={index} posts={post} />
        ))}
      </Flex>
    ) : props.isLibrary ? (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="100%"
        position="sticky"
        style={{marginTop:70}}
        height="max-content"
      >
        {/* <Heading as="h4" size="md">
          Recommend post
        </Heading> */}
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
    ) : props?.isSearch ? (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="100%"
        position="sticky"
        top="5.4rem"
        height="max-content"
      >
        <Heading as="h4" size="md">
          Search results
        </Heading>
        {props?.searchPosts?.length === 0 ? (
          <Flex
            width="100%"
            justifyContent="center"
            alignItems="center"
            height="80vh"
            flexDirection="column"
            gap="1rem"
          >
            <Image alt="" src="/ohno.png" width="50%" height="50%" />
            <Heading as="h4" size="md" color="gray.500">
              No search results found
            </Heading>
          </Flex>
        ) : (
          props?.searchPosts?.map((post, index) => (
            <Post key={index} posts={post} />
          ))
        )}
      </Flex>
    ) : props?.isProfile ? (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="100%"
        position="sticky"
        top="5.4rem"
        height="max-content"
      >
        <Heading as="h4" size="md">
          {props?.username} posts
        </Heading>
        {props?.profilePosts?.length === 0 ? (
          <Flex
            width="100%"
            justifyContent="center"
            alignItems="center"
            height="80vh"
            flexDirection="column"
            gap="1rem"
          >
            <Image alt="" src="/ohno.png" width="50%" height="50%" />
            <Heading as="h4" size="md" color="gray.500">
              Oh noooooo this idiot has no posts
            </Heading>
          </Flex>
        ) : (
          props?.profilePosts?.map((post, index) => (
            <Post key={index} posts={post} />
          ))
        )}
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
        {/* <Heading as="h4" size="md">
          Your followers post
        </Heading> */}
         <Gallery props={props.isFollower}/>
      </Flex>
    ) : (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="100%"
        position="sticky"
        // style={{marginTop:70}}
        height="max-content"
      >
          <Gallery props={props.homePosts}/>
      </Flex>
    );
  };
  
  export default Feed;