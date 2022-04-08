# Getwork

Return work generateed by this user.

**URL** : `/getwork/:userid/`
**URL example**: '/getwork/62106da11a169d9e92370284'

**Method** : `GET`

**Auth required** : No

## Success Response

**Code** : `200 OK`

**Content example**

```json
[{"url":"www.aaa.jpg","s3_id":"0PH6g8BZ00E40AGu.jpg","type":"image"},{"url":"www.aaa.mp4","s3_id":"0PH6g8BZ00E40AGu.mp4","type":"video"},{"url":"www.aaa.png","s3_id":"0PH6g8BZ00E40AGu.png","type":"image"}
]
```


