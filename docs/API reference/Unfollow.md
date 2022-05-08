# Unfollow a user

Unfollow a user, then can not get new post for the user

**URL** : `/unfollow`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{"user_id":"[the id of follower]",
 "fol_user_id":"[the id of user been unfollowed]"
}
```

**Data example**

```json
{"user_id":"001",
"fol_user_id","002"
}
```


## Success Response

**Code** : `200 OK`

## Error Response

**Code** : `500 Internal Server Error`

