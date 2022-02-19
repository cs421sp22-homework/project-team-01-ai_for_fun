# Login

Used to collect user data for a registered User.

**URL** : `/user/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "email": "1111taoyiyi@gmail.com",
    "password": "1111taoyiyi"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "ID": "62106da11a169d9e92370284",
    "user_id": "62106da11a169d9e92370284",
    "user_type": "ADMIN",
    "name": "Yiyi Tao",
    "email": "1111taoyiyi@gmail.com",
    "password": "$2a$14$L.hUbi6SFW.pnW3Jg7eYcOFwDAEWOrHCflAGKCRrwm0/HZ3A6h7gW",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IjExMTF0YW95aXlpQGdtYWlsLmNvbSIsIk5hbWUiOiJZaXlpIFRhbyIsIlVpZCI6IjYyMTA2ZGExMWExNjlkOWU5MjM3MDI4NCIsIlVzZXJfdHlwZSI6IkFETUlOIiwiZXhwIjoxNjQ1MzMyNjc4fQ.pui-s34AVJREJZrWgXbk0rzR95MxmyC40P6CsEEJ608",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IiIsIk5hbWUiOiIiLCJVaWQiOiIiLCJVc2VyX3R5cGUiOiIiLCJleHAiOjE2NDU4NTEwNzh9.za0jloyiuBb0MvYEoH1tO_vqEM-JHuR-PWca7Z0c4gk"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
    'type': 'cors', 
    'url': 'http://localhost:8000/user/login', 
    'redirected': 'false', 
    'status': '500', 
    'ok': 'false'
}
```
