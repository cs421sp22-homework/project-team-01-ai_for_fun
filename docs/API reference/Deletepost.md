# Deletepost

delete a post

**URL** : `/deletepost`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{
"postid":"[post id]",
"userid":"[user id]"
}

```

**Data example**

```json
{
"postid":"001",
"userid":"001"
}
```


## Success Response

**Code** : `200 OK`

## Error Response
**Code** : `500 Internal Server Error`

