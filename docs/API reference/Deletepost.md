# Deletepost

delete a post

**URL** : `/deletepost`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{
"post_id":"[post id]",
"user_id":"[user id]"
}

```

**Data example**

```json
{
"post_id":"001",
"user_id":"001"
}
```


## Success Response

**Code** : `200 OK`

## Error Response
**Code** : `500 Internal Server Error`

