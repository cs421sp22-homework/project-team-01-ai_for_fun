# Is user A follow user B

Determine whether A follows B, the return will be 0/1, 0 reveals B isn't followed by A, 1 reveals B is followed by A

**URL** : `/isfollowed`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{
 "follower_id":"[the user_id of follower]",
 "followed_id":"[the user_id of user been followed]"
}
```

**Data example**

```json
{
"follower_id":"001",
"followed_id":"002"
}
```


## Success Response

**Code** : `200 OK`
**Response Data**
{
"res":"0"
}
## Error Response

**Code** : `500 Internal Server Error`

