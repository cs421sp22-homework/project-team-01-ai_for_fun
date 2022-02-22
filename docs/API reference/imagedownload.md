# Imageupload

User upload the photo to the backend

**URL** : `/api/download`

**Method** : `get`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[a single file with formation of png jpg(form data)]",
    "filename": "[the type of file]"
}
```

**Data example**

```json
{
"username": "Timcar",
"filename": "a.jpg"
}
```

## Success Response

**Code** : `1 OK`

**Content example**

```json
{
    "url": "https://bigjpg-server.oss-cn-shenzhen.aliyuncs.com/free/cff075e78fa91edaf3ea67f3cd5752cf_1_-1_art.jpg"
}
```

## Error Response

**Condition** : Not finish the transfer

**Code** : `406 BAD REQUEST`

**Content** :

```json
{
    "non_field_errors": [
        "The transform of the file is not finished"
    ]
}
```
