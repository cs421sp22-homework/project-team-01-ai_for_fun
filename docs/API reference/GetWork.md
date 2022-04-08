# Getwork

Return work generateed by this user.

**URL** : `/getwork/:userid/`
**URL example**: '/getwork/qwdyk3udbk12'

**Method** : `GET`

**Auth required** : No

## Success Response

**Code** : `200 OK`

**Content example**

```json
[{"_id":"2214hbjy1e2b","user_id":"qwdyk3udbk12","url":"www.aaa.jpg","s3_id":"0PH6g8BZ00E40AGu.jpg","type":"image"},{"_id":"2214hbjy1e2s","user_id":"qwdyk3udbk12","url":"www.aaa.mp4","s3_id":"0PH6g8BZ00E40AGu.mp4","type":"video"},{"_id":"2214hbjy1e2q","user_id":"qwdyk3udbk12","url":"www.aaa.png","s3_id":"0PH6g8BZ00E40AGu.png","type":"image"}
]
```


