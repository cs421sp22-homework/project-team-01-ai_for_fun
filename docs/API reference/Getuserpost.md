# Getpost

Returns all posts related to a user

**URL** : `/getuserpost`

**Method** : `POST`

**Auth required** : No
**Data constraints**

```json
{
    "userid": "[the id of user]"
}
```

**Data example**

```json
{
   "userid": "002"
}
```


## Success Response

**Code** : `200 OK`

**Content example**

```json
{"posts":
[
{
"postid":"1","contenteurl":"image1.jpg", "likedtime":"5","posttext":"Looksgood","userid":"001","username":"mx","useravater":"a.jpg","posttime":"2022-2-2",
"comment":[
{
"commentid":"01","userid":"02", "username":"as","commentcontent":"cool",
"reply": [{"userid":"03","username":"qq","useravater":"as.jpg","replycontent":"1"},{"userid":"03","username":"ww","useravater":"as2.jpg","replycontent":"2"}]
},
{
"commentid":"02","userid":"03", "username":"as","commentcontent":"cool",
"reply": [{"userid":"03","username":"qq","useravater":"as.jpg","replycontent":"1"},{"userid":"03","username":"ww","useravater":"as2.jpg","replycontent":"2"}]
}
	     ]
},
{
"postid":"2","contenteurl":"image2.jpg", 
"likedtime":"0","posttext":"Looksgood","userid":"001","username":"mx","useravater":"a.jpg","posttime":"2022-2-2",
"comment":[
{
"commentid":"01","userid":"02", "username":"as","commentcontent":"cool",
"reply": [{"userid":"03","username":"qq","useravater":"as.jpg","replycontent":"1"},{"userid":"03","username":"ww","useravater":"as2.jpg","replycontent":"2"}]
},
{
"commentid":"02","userid":"03", "username":"as","commentcontent":"cool",
"reply": [{"userid":"03","username":"qq","useravater":"as.jpg","replycontent":"1"},{"userid":"03","username":"ww","useravater":"as2.jpg","replycontent":"2"}]
}
	     ]
}                   
]
}
```
**Code** : `500 Internal Server Error`

