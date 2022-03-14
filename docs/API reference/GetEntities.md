# GetEntities

Return all entities group by model and topic

**URL** : `/getentities`

**Method** : `GET`

**Auth required** : No

## Success Response

**Code** : `200 OK`

**Content example**

```json
{"swapface":[
        {"star":
        [{ "imgUrl": "./img/01.png", "vedioUrl": "....", "imagename": "01", "videoname": "01", "topic": "Star", "mode": "swapface" },{ "imgUrl": "./img/02.png","vedioUrl": "....","imagename": "02", "videoname": "02", "topic": "Star", "mode": "swapface" }]
        },
        {"house":
        [{ "imgUrl": "./img/03.png", "vedioUrl": "....","imagename": "03", "videoname": "03", "topic": "house", "mode": "swapface" },{ "imgUrl": "./img/04.png", "vedioUrl": "....","imagename": "04", "videoname": "04", "topic": "house", "mode": "swapface" }]
        }
  		   ],
"styleflow":[
         {"star":
        [{ "imgUrl": "./img/01.png", "vedioUrl": "....", "imagename": "01", "videoname": "01", "topic": "Star", "mode": "styleflow" },{ "imgUrl": "./img/02.png","vedioUrl": "....","imagename": "04", "videoname": "04", "topic": "Star", "mode": "styleflow" }]
        },
        {"house":
        [{ "imgUrl": "./img/03.png", "vedioUrl": "....","imagename": "04", "videoname": "04", "topic": "house", "mode": "styleflow" },{ "imgUrl": "./img/04.png", "vedioUrl": "....","imagename": "04", "videoname": "04", "topic": "house", "mode": "styleflow" }]
        }
          ],
"text2audio":[
         {"star":
        [{ "imgUrl": "./img/01.png", "vedioUrl": "....", "imagename": "04", "videoname": "04", "topic": "Star", "mode": "text2audio" },{ "imgUrl": "./img/02.png","vedioUrl": "....","imagename": "04", "videoname": "04", "topic": "Star", "mode": "text2audio" }]
        },
        {"house":
        [{ "imgUrl": "./img/03.png", "vedioUrl": "....","imagename": "04", "videoname": "04", "topic": "house", "mode": "text2audio" },{ "imgUrl": "./img/04.png", "vedioUrl": "....","imagename": "04", "videoname": "04", "topic": "house", "mode": "text2audio" }]
        }
  		   ]
}
```

