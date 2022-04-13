# Follow a user

follow a user, then can get new post for the user

**URL** : `/follow`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{"user_id":"[the id of follower]",
 "fol_user_id":"[the id of user been followed]"
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

