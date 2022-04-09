# GetHistory

Return recent uploaded url by this user, the maximum is 6.

**URL** : `/history/:userid/`
**URL example**: '/history/62106da11a169d9e92370284'

**Method** : `GET`

**Auth required** : No

## Success Response

**Code** : `200 OK`

**Content example**

```json
[{"_id":"004e","url":"www.aaa.jpg","s3_id":"0PH6g8BZ00E40AGu.jpg"},{"_id":"005f","url":"www.aaa.jpg","s3_id":"0PH6g8BZ00E40AGu.jpg"}
]
```


