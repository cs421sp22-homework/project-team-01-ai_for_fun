import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { React, useState, useEffect} from "react";
import { FaHome } from "react-icons/fa";
import { MdExplore, MdPhotoLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdCreate, IoMdImages } from "react-icons/io";
import { RiUserFollowFill } from "react-icons/ri";
import { useCookies } from 'react-cookie';
import { Avatar} from 'antd';

function RightSidebar() {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(['access_token', 'user_id', 'refresh_token', 'name', 'email', 'avatar']);
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  useEffect(async () => {
    if (cookie.user_id){
      let url = 'https://server-demo.ai-for-fun-backend.com/postlikeinfo/' + cookie.user_id;
      let url2 = 'https://server-demo.ai-for-fun-backend.com/getfollowinfo/' + cookie.user_id;
      const response = await fetch(url)
      const response2 = await fetch(url2)
      console.log(response);
      if (response.status == 200) {
          const content = await response.json();
          setLikes(content[0].liked_sum)
          console.log(content)
      }
      else {
          console.log('request failed', response.body);
          setLikes(0)
      }
      if (response2.status == 200) {
        const content2 = await response2.json();
        setFollowers(content2[0].follower_count)
        console.log(content2)
    }
    else {
        console.log('request failed', response2.body);
        setFollowers(0)
    }
      }

}, [])
  
  return (
    <Flex
      position="sticky"
      top="5.4rem"
      height="max-content"
      flexDirection="column"
    >
      <Tooltip label="The user information" openDelay={300}>
        {cookie.user_id?
                <Flex
                // className="profilestuff"
                // cursor="pointer"
                alignItems="center"
                width="100%"
                padding="1rem"
                borderRadius="1rem"
                gap="0.2rem"
                boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                flexDirection="column"
              >
                <Flex>
                  <Avatar src={cookie.avatar} size={80} alt=""/>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                  <Heading as="h5" size="lg">
                    {cookie.name}
                  </Heading>
                </Flex>
                <hr/>
                <Flex flexDirection="row" alignItems="stretch">
                  <Flex flexDirection="column" alignItems="center" style={{'width':'45%','marginRight':'15px'}}>
                  <Heading as="h5" size="lg">
                    Followers
                  </Heading>
                  <Text>{followers}</Text>
                  </Flex>
                  <Flex flexDirection="column" alignItems="center"  style={{'width':'45%'}}>
                  <Heading as="h5" size="lg">
                    Likes
                  </Heading>
                  <Text>{likes}</Text>
                  </Flex>
                </Flex>
              </Flex>
      :
          <Flex
          className="profilestuff"
          cursor="pointer"
          alignItems="center"
          width="100%"
          padding="1rem"
          borderRadius="1rem"
          gap="0.2rem"
          boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
          style={{'height':'200px'}}
        >
          <Flex borderRadius="50%">
          </Flex>
          <Flex flexDirection="column" alignItems="start">
            <Text>Register/ Login</Text>
          </Flex>
        </Flex>
      }

      </Tooltip>
      <Flex
        borderRadius="1rem"
        boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
        marginTop="2rem"
        width="100%"
        flexDirection="column"
      >
        {window.location.pathname === "/gallery" ? (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            borderTopRightRadius="1rem"
            borderTopLeftRadius="1rem"
            backgroundColor={colorMode === "light" ? "#cfcfcf57" : "#27272983"}
            onClick={() => {
              navigate("/gallery");
            }}
          >
            <FaHome
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Home
            </Heading>
          </Flex>
        ) : (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            borderTopLeftRadius="1rem"
            _hover={{
              backgroundColor:
                colorMode === "light" ? "#cfcfcf57" : "#27272983",
            }}
            borderTopRightRadius="1rem"
            onClick={() => {
              navigate("/gallery");
            }}
          >
            <FaHome
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Home
            </Heading>
          </Flex>
        )}
        {window.location.pathname === "/your_posts" ? (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            backgroundColor={colorMode === "light" ? "#cfcfcf57" : "#27272983"}
            onClick={() => {
              navigate("/your_posts");
            }}
          >
            <IoMdImages
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Your posts
            </Heading>
          </Flex>
        ) : (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            _hover={{
              backgroundColor:
                colorMode === "light" ? "#cfcfcf57" : "#27272983",
            }}
            onClick={() => {
              navigate("/your_posts");
            }}
          >
            <IoMdImages
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Your posts
            </Heading>
          </Flex>
        )}
        {window.location.pathname === "/explore" ? (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            backgroundColor={colorMode === "light" ? "#cfcfcf57" : "#27272983"}
            onClick={() => {
              navigate("/explore");
            }}
          >
            <MdExplore
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Explore
            </Heading>
          </Flex>
        ) : (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            _hover={{
              backgroundColor:
                colorMode === "light" ? "#cfcfcf57" : "#27272983",
            }}
            onClick={() => {
              navigate("/explore");
            }}
          >
            <MdExplore
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Explore
            </Heading>
          </Flex>
        )}
        {window.location.pathname === "/library" ? (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            backgroundColor={colorMode === "light" ? "#cfcfcf57" : "#27272983"}
            onClick={() => {
              navigate("/library");
            }}
          >
            <MdPhotoLibrary
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Library
            </Heading>
          </Flex>
        ) : (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            _hover={{
              backgroundColor:
                colorMode === "light" ? "#cfcfcf57" : "#27272983",
            }}
            onClick={() => {
              navigate("/library");
            }}
          >
            <MdPhotoLibrary
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Library
            </Heading>
          </Flex>
        )}
        
        {window.location.pathname === "/followers" ? (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            backgroundColor={colorMode === "light" ? "#cfcfcf57" : "#27272983"}
            onClick={() => {
              navigate("/followers");
            }}
          >
            <RiUserFollowFill
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Followers
            </Heading>
          </Flex>
        ) : (
          <Flex
            alignItems="center"
            cursor="pointer"
            height="4rem"
            transition="all 300ms ease"
            gap="1rem"
            _hover={{
              backgroundColor:
                colorMode === "light" ? "#cfcfcf57" : "#27272983",
            }}
            onClick={() => {
              navigate("/followers");
            }}
          >
            <RiUserFollowFill
              size="1.4rem"
              style={{
                marginLeft: "1rem",
              }}
            />
            <Heading as="h5" size="md">
              Followers
            </Heading>
          </Flex>
        )}
      </Flex>
      <Tooltip openDelay={400} label="Create shit">
        <Button
          leftIcon={<IoMdCreate />}
          colorScheme="purple"
          variant="solid"
          marginTop="2rem"
          onClick={() => {
            navigate("/Post");
          }}
        >
          Create
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default RightSidebar;