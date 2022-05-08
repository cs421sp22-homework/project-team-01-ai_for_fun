# Userbasicinfo

Used to get basic information of a signin user.

**URL** : `/userbasicinfo/:userid/`
**URL example**: '/users/62106da11a169d9e92370284'

**Method** : `GET`

**Auth required** : No


## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    
    "name": "Yiyi Tao",
    "email": "1111taoyiyi@gmail.com",
    "avatar": "https://sdcfdsfsasfsd.jpg",
}
```

## Error Response

**Code** : `500 Internal Server Error`
