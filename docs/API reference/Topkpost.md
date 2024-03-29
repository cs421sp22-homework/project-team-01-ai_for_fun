# Topkpost

Returns top k posts which is sort by liked number,commentnumber, imagepost, or video post

**URL** : `/topkpost`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{
"sorttype":"[the type of sort, which can be likeNumber/commentNumber/imagePost/videoPost]",
 "k":["the number of return post"]
}
```

**Data example**

```json
{
"sorttype":"likeNumber",
 "k":10
}
```


## Success Response

**Code** : `200 OK`

**Content example**

```
json
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

## Error Response
**Code** : `500 Internal Server Error`


