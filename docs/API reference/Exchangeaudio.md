# Exchangeaudio

get a special video from a text

**URL** : `/exchangeaudio`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
"user_id":"[the user id]"
"text":"[the text you want to generate]",
"person":"[the person you to transfer to: minnie-mouse/mickey-mouse/donald-duck]"
}
```

**Data example**

```json
{
"user_id":"62106da11a169d9e92370284"
"text":"I love this",
"person":"minnie-mouse"
}
```

## Response

```json
{"res_s3_id": "twb6CPRZmnLPq9Sr.mp4", "res_url":
"https://aifun.s3.amazonaws.com/twb6CPRZmnLPq9Sr.jpg?AWSAccessKeyId=AKIAXRGYYT5KAP6UULMPSignature=feaTCoaVp6Bse7fTzRF2rVQhfN"}
```
