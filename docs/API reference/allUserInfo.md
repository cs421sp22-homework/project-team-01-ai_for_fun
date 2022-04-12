# Register

Used to get all user info in the database.

**URL** : `/users/login/`

**Method** : `POST`

**Auth required** : YES, USER MUST BE ADMIN.

**Header constraints**

```json
{
    "token": "[validToken of ADMIN user]"
}
```

**Header example**

```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRhb3lpeWkxMTExQGdtYWlsLmNvbSIsIk5hbWUiOiJZaXlpIFRhbyIsIlVpZCI6IjYyMTExNGFlNDdjOTQ0OWNhZWZiMTE1OSIsIlVzZXJfdHlwZSI6IkFETUlOIiwiZXhwIjoxNjQ1MzczMDAxfQ.nCKeWZmiuH0nQsKDw1iPHZDXI8X-qJIIHiFNbX1orZk"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "total_count": 4,
    "user_items": [
        {
            "_id": "62110b261a169d9e92370289",
            "email": "1111taoyiyi@gmail.com",
            "name": "Yiyi Tao",
            "password": "$2a$14$b93DaRYqsYqdbMWL4o9HdOp58Z3caRMniZ0M4t4SUMKB4zjADPfsG",
            "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IiIsIk5hbWUiOiIiLCJVaWQiOiIiLCJVc2VyX3R5cGUiOiIiLCJleHAiOjE2NDU4OTA3MDN9.M18uDYeVeG7Y6jHRLH0TUOCwzU9GDxw0izTORb53IcI",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IjExMTF0YW95aXlpQGdtYWlsLmNvbSIsIk5hbWUiOiJZaXlpIFRhbyIsIlVpZCI6IjYyMTEwYjI2MWExNjlkOWU5MjM3MDI4OSIsIlVzZXJfdHlwZSI6IlVTRVIiLCJleHAiOjE2NDUzNzIzMDN9.oBRx8WmVP5awHf0U62Pwdwrl9yWhYibK9izEQ2OQGdg",
            "user_id": "62110b261a169d9e92370289",
            "user_type": "USER"
        },
        {
            "_id": "62110fd247c9449caefb1157",
            "email": "test@test.email",
            "name": "test",
            "password": "$2a$14$25k5hf42INK7B62fRUPMVe/sdxilowm0Hjji3ozzn3rOxTSbhHawi",
            "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IiIsIk5hbWUiOiIiLCJVaWQiOiIiLCJVc2VyX3R5cGUiOiIiLCJleHAiOjE2NDU4OTAxMzB9.DXva_N677kNpaWQ8qzSJDVG3YgELJXnQhYqxU1YIyGg",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RAdGVzdC5lbWFpbCIsIk5hbWUiOiJ0ZXN0IiwiVWlkIjoiNjIxMTBmZDI0N2M5NDQ5Y2FlZmIxMTU3IiwiVXNlcl90eXBlIjoiVVNFUiIsImV4cCI6MTY0NTM3MTczMH0.6A9cNMNowQiBBIRvO3eG6JnysfpfxfUuT68DgOEbknc",
            "user_id": "62110fd247c9449caefb1157",
            "user_type": "USER"
        },
        {
            "_id": "6211101f47c9449caefb1158",
            "email": "test@test.com",
            "name": "test",
            "password": "$2a$14$scEic4PL71v3Iz6RcDKAteUibqSRW/M7estigUx9GLV/TGoPX4c16",
            "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IiIsIk5hbWUiOiIiLCJVaWQiOiIiLCJVc2VyX3R5cGUiOiIiLCJleHAiOjE2NDU4OTAyMDd9.7W-lZc2eL_ciz44792eahTfeZVqi8olkIkWAjyjMf0U",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RAdGVzdC5jb20iLCJOYW1lIjoidGVzdCIsIlVpZCI6IjYyMTExMDFmNDdjOTQ0OWNhZWZiMTE1OCIsIlVzZXJfdHlwZSI6IlVTRVIiLCJleHAiOjE2NDUzNzE4MDd9.RgcoobtO7RlQWwixWD7Vi5Cw-jAmcb7r_jmSkcY7jxE",
            "user_id": "6211101f47c9449caefb1158",
            "user_type": "USER"
        },
        {
            "_id": "621114ae47c9449caefb1159",
            "email": "taoyiyi1111@gmail.com",
            "name": "Yiyi Tao",
            "password": "$2a$14$j4w1nLdWX.ttrY0v7bkWkeTZig3r1v099d8fCheComuzbwF5wDGQW",
            "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IiIsIk5hbWUiOiIiLCJVaWQiOiIiLCJVc2VyX3R5cGUiOiIiLCJleHAiOjE2NDU4OTE0MDF9.iy0K4xfnhYJXeQDSZ_MwoNm5P0syVGg8qSMUYdALOtc",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRhb3lpeWkxMTExQGdtYWlsLmNvbSIsIk5hbWUiOiJZaXlpIFRhbyIsIlVpZCI6IjYyMTExNGFlNDdjOTQ0OWNhZWZiMTE1OSIsIlVzZXJfdHlwZSI6IkFETUlOIiwiZXhwIjoxNjQ1MzczMDAxfQ.nCKeWZmiuH0nQsKDw1iPHZDXI8X-qJIIHiFNbX1orZk",
            "user_id": "621114ae47c9449caefb1159",
            "user_type": "ADMIN"
        }
    ]
}
```

## Error Response

**Condition** : If the token is invalid or User is not ADMIN.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
    "error": "Unauthorized to access this resource"
}
```
