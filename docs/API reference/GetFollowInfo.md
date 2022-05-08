# Getpost

Returns all posts related to a user

**URL** : `/getfollowinfo/:user_id`

**Method** : `get`

**Auth required** : No
**Data constraints**

empty

**Data example**

empty


## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "followed_count": 2,
        "followed_list": [
            "62339dc5415d2048fc875cf2",
            "62340222554768fb6cd0f781"
        ],
        "follower_count": 2,
        "follower_list": [
            "62339dc5415d2048fc875cf2",
            "62340222554768fb6cd0f781"
        ]
    }
]
```
**Code** : `500 Internal Server Error`
