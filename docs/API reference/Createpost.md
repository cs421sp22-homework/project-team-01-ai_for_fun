# Createpost

create a new post

**URL** : `/createpost`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{
"content_url":"[url]",
"post_text":"[text]",
"user_id":"[the id of user]",
"user_name":"[username]",
"user_avater":"[the avater of user]"
}

```

**Data example**

```json
{
"content_url":"image.jpg",
"post_text":"looks good",
"user_id":"001",
"user_name":"mx",
"user_avater":"mx.jpg"
}
```


## Success Response

**Code** : `200 OK`
## Error Response

**Code** : `500 Internal Server Error`

