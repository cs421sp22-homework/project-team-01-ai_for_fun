# Styletransfer

Transfer style of two image

**URL** : `/styletransfer`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "user_id": "[a string contain userid]",
    "content_url": "[a string contain url of content image]",
    "content_s3_id": "[a string contain content_s3_id]",
    "style_url": "[a string contain url of style image]"
}
```

**Data example**

```json
{
    "user_id":"62106da11a169d9e92370299",
    "content_url":"https://i.postimg.cc/8zFrWpFg/0-202009230849071-Xy-Oc.jpg",
    "content_s3_id":"1eZnePwSETNSdNaT.jpg",
    "style_url":"https://i.postimg.cc/nh7hpCjr/23ukraine-briefing9-master1050.jpg"
}
```

## Response

```json
{"res_s3_id": "twb6CPRZmnLPq9Sr.jpg", "res_url":
"https://aifun.s3.amazonaws.com/twb6CPRZmnLPq9Sr.jpg?AWSAccessKeyId=AKIAXRGYYT5KAP6UULMPSignature=feaTCoaVp6Bse7fTzRF2rVQhfN"}
```
