# Userinfo

Used to get all information of a signin user.

**URL** : `/users/:userid/`
**URL example**: '/users/62106da11a169d9e92370284'

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
{
    "ID": "62110b261a169d9e92370289",
    "user_id": "62110b261a169d9e92370289",
    "user_type": "USER",
    "name": "Yiyi Tao",
    "email": "1111taoyiyi@gmail.com",
    "password": "$2a$14$b93DaRYqsYqdbMWL4o9HdOp58Z3caRMniZ0M4t4SUMKB4zjADPfsG",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IjExMTF0YW95aXlpQGdtYWlsLmNvbSIsIk5hbWUiOiJZaXlpIFRhbyIsIlVpZCI6IjYyMTEwYjI2MWExNjlkOWU5MjM3MDI4OSIsIlVzZXJfdHlwZSI6IlVTRVIiLCJleHAiOjE2NDUzNzIzMDN9.oBRx8WmVP5awHf0U62Pwdwrl9yWhYibK9izEQ2OQGdg",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IiIsIk5hbWUiOiIiLCJVaWQiOiIiLCJVc2VyX3R5cGUiOiIiLCJleHAiOjE2NDU4OTA3MDN9.M18uDYeVeG7Y6jHRLH0TUOCwzU9GDxw0izTORb53IcI"
}
```

## Error Response

**Condition** : If the token is invalid.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
    "error": "Unauthorized to access this resource"
}
```
