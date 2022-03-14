# Register

Used to registered User and save.

**URL** : `/user/register/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]",
    "name": "[name in plain text]",
    "user_type":"[the type of user, "ADMIN" or "USER"]"
}
```

**Data example**

```json
{
    "email": "1111taoyiyi@gmail.com",
    "password": "1111taoyiyi",
    "name":"Yiyi Tao",
    "user_type":"ADMIN"
    
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "InsertedID": "62110fd247c9449caefb1157"    
}
```

## Error Response

**Condition** : If email is already used.

**Code** : `500 Internal Server Error`

**Content** :

```json
{"error":"this email has already been used"}
```
