# GetHistory

Return recent uploaded url by this user, the maximum is 6.

**URL** : `/history/:userid/`
**URL example**: '/history/62106da11a169d9e92370284'

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
[{"image_id":"004e","url":"www.aaa.jpg","s3_id":"0PH6g8BZ00E40AGu.jpg"},{"image_id":"005f","url":"www.aaa.jpg","s3_id":"0PH6g8BZ00E40AGu.jpg"}
]
```


