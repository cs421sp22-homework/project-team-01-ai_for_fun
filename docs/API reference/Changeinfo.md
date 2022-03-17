# changeinfo

Change user info

**URL** : `/changeinfo/:userid/`
**URL example**: '/changeinfo/62106da11a169d9e92370284'

**Method** : `Post`

**Auth required** : No

**Data constraints**

```json
{
    "old_password": "[the old password]",
    "new_password": "[the new password]",
    "new_avatar": "[the url of new avatar]",
    "new_name":"[new username]"
}
```

**Data example**

```json
{
    "old_password": "admin1",
    "new_password": "admin2",
    "new_avatar": "./02.jpg",
    "new_name": "yiyitao"
}
```

## Success Response

**Code** : `200 OK`

## Error Response

**Condition** : If the old password is error.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
    "error": "password not correct"
}
```
