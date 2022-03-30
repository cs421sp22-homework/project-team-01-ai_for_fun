# Createpost

create a new post

**URL** : `/createpost`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{
"contenturl":"[url]",
"posttext":"[text]",
"userid":"[the id of user]",
"username":"[username]",
"useravater":"[the avater of user]"
}

```

**Data example**

```json
{
"contenturl":"image.jpg",
"posttext":"looks good",
"userid":"001",
"username":"mx",
"useravater":"mx.jpg"
}
```


## Success Response

**Code** : `200 OK`
## Error Response

**Code** : `500 Internal Server Error`

