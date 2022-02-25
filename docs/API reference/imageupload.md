# Imageupload

User upload the photo to the backend

**URL** : `/api/upload`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "user_id":"[a string contain userid]",
    "file": [a single file with formation of png jpg(form data)],
    "filetype": "[the type of file]",
    "transfertype": [a integer which indicate the type of transfer(1: swap face, 2:change facial feature)]
}
```

**Data example**

```json
{
"user_id":"Timcar"
 "file": a.jpg,
 "filetype": "jpg",
 "transfertype": 1
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "successful upload"
}
```

## Error Response

**Condition** : Unable to upload file

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "non_field_errors": [
        "Unable to upload file"
    ]
}
```
