# Deletepost

delete a history

**URL** : `/deletehistory`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{
"his_id":"[his id]",
"user_id":"[user id]"
}

```

**Data example**

```json
{
"his_id":"001",
"user_id":"001"
}
```


## Success Response

**Code** : `200 OK`

## Error Response
**Code** : `500 Internal Server Error`

