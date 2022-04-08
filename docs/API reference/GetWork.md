# GetHistory

Return work generateed by this user.

**URL** : `/getwork/:userid/`
**URL example**: '/getwork/62106da11a169d9e92370284'

**Method** : `GET`

**Auth required** : Yes

**Header constraints**

```json
{
    "token": "[validToken of this user]"
}
```

**Header example**

```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IjExMTF0YW95aXlpQGdtYWlsLmNvbSIsIk5hbWUiOiJZaXlpIFRhbyIsIlVpZCI6IjYyMTA2ZGExMWExNjlkOWU5MjM3MDI4NCIsIlVzZXJfdHlwZSI6IkFETUlOIiwiZXhwIjoxNjQ1MzMyNjc4fQ.pui-s34AVJREJZrWgXbk0rzR95MxmyC40P6CsEEJ608"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
[{"work_id":"004e","url":"www.aaa.jpg","s3_id":"0PH6g8BZ00E40AGu.jpg","type":"image"},{"work_id":"005f","url":"www.aaa.mp4","s3_id":"0PH6g8BZ00E40AGu.mp4","type":"video"},{"work_id":"006f","url":"www.aaa.png","s3_id":"0PH6g8BZ00E40AGu.png","type":"image"}
]
```


