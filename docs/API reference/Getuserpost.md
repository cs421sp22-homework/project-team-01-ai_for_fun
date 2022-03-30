# Getpost

Returns all posts related to a user

**URL** : `/getuserpost/:userid`

**Method** : `get`

**Auth required** : No
**Data constraints**

empty

**Data example**

empty


## Success Response

**Code** : `200 OK`

**Content example**

```json
[
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
        "contenturl": "image1.jpg",
        "likedtime": 5,
        "posttext": "Looks good",
        "posttime": "2022-02-02T05:00:00Z",
        "useravater": "a.jpg",
        "userid": "1",
        "username": "mx"
    }
]
```
**Code** : `500 Internal Server Error`

