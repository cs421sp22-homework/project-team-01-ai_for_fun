# Faceswap

Swap the face of source image to the face of target image

**URL** : `/faceswap`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "user_id": "[a string contain userid]",
    "src_url": "[a string contain url of source image]",
    "src_s3_id": "[a string contain src_s3_id]",
    "dst_url": "[a string contain url of target image]",
    "dst_s3_id": "[a string contain dst_s3_id]"
}
```

**Data example**

```json
{
    "user_id": "62106da11a169d9e92370284",
    "src_url": "https://i.postimg.cc/TwTdxrs6/v2-75cc7fe18dbf470b833c5bca162df557-img-000.png",
    "src_s3_id": "sad.png",
    "dst_url": "https://i.postimg.cc/QCgRSPmG/0-202009230849071-Xy-Oc.jpg"
    "dst_s3_id": "sassd1.png"
}
```

## Response

```json
{"res_s3_id": "twb6CPRZmnLPq9Sr.jpg", "res_url":
"https://aifun.s3.amazonaws.com/twb6CPRZmnLPq9Sr.jpg?AWSAccessKeyId=AKIAXRGYYT5KAP6UULMPSignature=feaTCoaVp6Bse7fTzRF2rVQhfN"}
```
