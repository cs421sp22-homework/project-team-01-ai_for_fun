# RESTAPIDocs 

This file records APIs for AIforfun project

## Login

* [Login](login.md) : `POST /user/login/`
* [Register](register.md) : `POST /user/register/`
* [Userinfo](userInfo.md) : `GET /users/:user_id`
* [Userbasicinfo](userbasicInfo.md) : `GET /users/:user_id`
* [AllUserInfo](allUserInfo.md) : `GET /users`

## AI model

* [Faceswap](Faceswap.md) : `POST /faceswap`
* [Styletransfer](Styletransfer.md) : `POST /styletransfer`
* [Exchangeaudio](Exchangeaudio.md) : `POST /exchangeaudio`

## User service

* [GetEntities](GetEntities.md) : `Get /getentities`
* [Changeinfo](Changeinfo.md) : `Post /changeinfo/:user_id`

## Community Service

* [Getpost](Getpost.md): `Get /getpost`
* [Getuserpost](Getuserpost.md): `Get /getuserpost/:user_id`
* [Createpost](Createpost.md): `Post /createpost`
* [Deletepost](Deletepost.md): `Post /deletepost`
* [Createcomment](Createcomment.md): `Post /createcomment`
* [Createreply](Createreply.md): `Post /createreply`
* [Likepost](Likepost.md): `Post /likepost`
* [Follow](Follow.md):`Post /follow`
* [Unfollow](Unfollow.md):`Post /unfollow`
* [IsFollowed](IsFollowed.md):`Post /isfollowed`
* [Topkpost](Topkpost.md):`Post /topkpost`
* [GetFollowerPost](GetFollowerPost.md):`Get /getfollowerpost/:user_id`
* [GetFollowedPost](GetFollowedPost.md):`Get /getfollowedpost/:user_id`
* [PostLikeInfo](PostLikeInfo.md):`Get /postlikeinfo/:user_id`
* [GetFollowInfo](GetFollowInfo.md):`Get /getfollowinfo/:user_id`

## Work Service
* [GetHistory](GetHistory.md) : `Get /gethistory/:user_id`
* [DeleteHistory](DeleteHistory.md) : `Post /deletehistory`
* [GetWork](GetWork.md) : `Get /getwork/:user_id`
* [DeleteWork](DeleteWork.md) : `Post /deletework`
