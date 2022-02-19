# Register

Used to registered User and save.

**URL** : `/user/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "name": "[name in plain text]"
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "name":"Yiyi Tao"
    "email": "1111taoyiyi@gmail.com",
    "password": "1111taoyiyi"
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
{
    "type": "cors", 
    "url": "http://localhost:8000/user/register", 
    "redirected": "false", 
    "status": "500", 
    "ok": "false"
}
```
