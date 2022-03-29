# Createcomment

create a new comment for a post

**URL** : `/createcomment`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{postid:"[postid]",
commentcontent:"[commentcontent]",
userid:"[userid]",
username:"[username]",
useravater:"[url of avater]"}

```

**Data example**

```json
{postid:"001",
commentcontent:"it's good",
userid:"023",
username:"mx",
useravater:"mx.jpg"}
```


## Success Response

**Code** : `200 OK`

## Error Response

**Code** : `500 Internal Server Error`

