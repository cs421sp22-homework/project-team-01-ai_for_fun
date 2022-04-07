# Getpost

Returns up to 30 newly published posts

**URL** : `/getpost`

**Method** : `GET`

**Auth required** : No

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": "624509daaf28a18a12ffbfbc",
        "comment": null,
        "content_url": "content.jpg",
        "liked_time": 0,
        "post_id": "624509daaf28a18a12ffbfbc",
        "post_text": "so funny",
        "post_time": "2022-03-31T01:54:34.396Z",
        "user_avater": "yiyi.jpg",
        "user_id": "002",
        "user_name": "yiyi"
    },
    {
        "_id": "624507f961ba4853080ffe45",
        "comment": null,
        "content_url": "image.jpg",
        "liked_time": 0,
        "post_id": "624507f961ba4853080ffe45",
        "post_text": "looks good",
        "post_time": "2022-03-31T01:46:33.317Z",
        "user_avater": "mx.jpg",
        "user_id": "001",
        "user_name": "mx"
    },
    {
        "_id": "6244a5ff413280b986b387c1",
        "comment": [
            {
                "commentcontent": "cool",
                "commentid": "1",
                "commenttime": "2022-02-03T05:10:44Z",
                "reply": [
                    {
                        "replycontent": "I agree",
                        "replytime": "2022-02-04T05:00:00Z",
                        "useravater": "as.jpg",
                        "userid": "3",
                        "username": "qq"
                    },
                    {
                        "replycontent": "I think so",
                        "replytime": "2022-02-05T05:00:00Z",
                        "useravater": "as2.jpg",
                        "userid": "4",
                        "username": "ww"
                    }
                ],
                "userid": "2",
                "username": "as"
            },
            {
                "commentcontent": "cool",
                "commentid": "2",
                "commenttime": "2022-02-03T05:00:00Z",
                "reply": [
                    {
                        "replycontent": "I agree",
                        "replytime": "2022-02-04T05:00:00Z",
                        "useravater": "as.jpg",
                        "userid": "6",
                        "username": "u6"
                    },
                    {
                        "replycontent": "I think so",
                        "replytime": "2022-02-05T05:00:00Z",
                        "useravater": "as2.jpg",
                        "userid": "7",
                        "username": "u7"
                    }
                ],
                "userid": "5",
                "username": "u5"
            }
        ],
        "content_url": "image1.jpg",
        "liked_time": 5,
        "post_id": "6244a5ff413280b986b387c1",
        "post_text": "Looks good",
        "post_time": "2022-02-02T05:00:00Z",
        "user_avater": "a.jpg",
        "user_id": "1",
        "user_name": "mx"
    }
]
```
**Code** : `500 Internal Server Error`

