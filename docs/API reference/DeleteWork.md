# Deletework

delete a work

**URL** : `/deletework`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{
"work_id":"[his id]",
"user_id":"[user id]"
}

```

**Data example**

```json
{
"work_id":"001",
"user_id":"001"
}
```


## Success Response

**Code** : `200 OK`

## Error Response
**Code** : `500 Internal Server Error`

