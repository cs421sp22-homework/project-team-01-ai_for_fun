# Follow a user

follow a user, then can get new post for the user

**URL** : `/follow`

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
"followed_id","002"
}
```


## Success Response

**Code** : `200 OK`

## Error Response

**Code** : `500 Internal Server Error`

