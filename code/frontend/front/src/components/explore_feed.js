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
  
//   type Posts = {
//     caption: string;
//     createdAt: string;
//     image: string;
//     userName: string;
//     userId: string;
//     userPfp: string;
//     id: string;
//   };
  
//   type Props = {
//     isExplore: boolean;
//     isLibrary: boolean;
//     isYourPosts: boolean;
//     isSearch: boolean;
//     isProfile: boolean;
//     isFollower: boolean;
//     username?: string;
//     homePosts?: Array<Posts>;
//     explorePosts?: Array<Posts>;
//     yourPosts?: Array<Posts>;
//     searchPosts?: Array<Posts>;
//     libraryPosts?: Array<Posts>;
//     profilePosts?: Array<Posts>;
//     followersData?: any;
//   };
  
  const Explore_Feed = (props) => {
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
      <Gallery props={props.isExplore}/>
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
        width="10%"
        position="sticky"
        top="5.4rem"
        height="10%"
      >
        <Heading as="h4" size="md">
          Saved posts
        </Heading>
        {props?.libraryPosts?.map((post, index) => (
          <Post key={index} posts={post} />
        ))}
      </Flex>
    ) : props?.isYourPosts ? (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="10%"
        position="sticky"
        top="5.4rem"
        height="10%"
      >
        <Heading as="h4" size="md">
          Your posts
        </Heading>
        {props?.yourPosts?.map((post, index) => (
          <Post key={index} posts={post} />
        ))}
      </Flex>
    ) : props?.isSearch ? (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="10%"
        position="sticky"
        top="5.4rem"
        height="10%"
      >
        <Heading as="h4" size="md">
          Search results
        </Heading>
        {props?.searchPosts?.length === 0 ? (
          <Flex
            width="10%"
            justifyContent="center"
            alignItems="center"
            height="10%"
            flexDirection="column"
            gap="1rem"
          >
            <Image alt="" src="/ohno.png" width="10%" height="10%" />
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
        width="10%"
        position="sticky"
        top="5.4rem"
        height="10%"
      >
        <Heading as="h4" size="md">
          {props?.username} posts
        </Heading>
        {props?.profilePosts?.length === 0 ? (
          <Flex
            width="10%"
            justifyContent="center"
            alignItems="center"
            height="10%"
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
        width="10%"
        position="sticky"
        top="5.4rem"
        height="10%"
      >
        <Flex gap="2rem" alignItems="center" flexWrap="wrap" marginBottom="1rem">
          {props?.followersData?.map((user, index) => (
            <Tooltip label={user?.username} openDelay={400} key={index}>
              <Avatar
                width="16"
                height="16"
                cursor="pointer"
                src={user?.pfp}
                onClick={() => {
                  navigate(`/profile/${user?.uid}`);
                }}
              />
            </Tooltip>
          ))}
        </Flex>
        <Heading as="h4" size="md">
          Your followers post
        </Heading>
      </Flex>
    ) : (
      <Flex
        flexDirection="column"
        gap="1rem"
        width="10%"
        position="sticky"
        top="5.4rem"
        height="10%"
      >
          <Gallery props={props.homePosts}/>
        
        {/* {props?.homePosts?.map((post, index) => (
          <Post key={index} posts={post} />
        ))} */}
      </Flex>
    );
  };
  
  export default Explore_Feed;