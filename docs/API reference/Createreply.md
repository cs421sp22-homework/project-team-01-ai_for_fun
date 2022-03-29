# Createreply

create a new reply for a comment

**URL** : `/createreply`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{"postid":"[postid]",
"commentid":"[comment id]",
"userid":"[userid]",
"username":"[username]",
"useravater":"[url of avater]"},
"replycontent":"[the content of the reply]"
}
```

**Data example**

```json
{"postid":"001",
"commentid":"001",
"userid":"023",
"username":"mx",
"useravater":"image.jpg"},
"replycontent":"good"
}
```


## Success Response

**Code** : `200 OK`

## Error Response

**Code** : `500 Internal Server Error`

