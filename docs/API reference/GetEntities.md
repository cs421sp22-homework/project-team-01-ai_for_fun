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
        [{ "imgUrl": "./img/01.png", "vedioUrl": "....", "name": "01", "topic": "Star", "mode": "swapface" },{ "imgUrl": "./img/02.png","vedioUrl": "....","name": "02", "topic": "Star", "mode": "swapface" }]
        },
        {"house":
        [{ "imgUrl": "./img/03.png", "vedioUrl": "....","name": "01", "topic": "house", "mode": "swapface" },{ "imgUrl": "./img/04.png", "vedioUrl": "....","name": "01", "topic": "house", "mode": "swapface" }]
        }
  		   ],
"styleflow":[
         {"star":
        [{ "imgUrl": "./img/01.png", "vedioUrl": "....", "name": "01", "topic": "Star", "mode": "styleflow" },{ "imgUrl": "./img/02.png","vedioUrl": "....","name": "02", "topic": "Star", "mode": "styleflow" }]
        },
        {"house":
        [{ "imgUrl": "./img/03.png", "vedioUrl": "....","name": "01", "topic": "house", "mode": "styleflow" },{ "imgUrl": "./img/04.png", "vedioUrl": "....","name": "01", "topic": "house", "mode": "styleflow" }]
        }
          ],
"text2audio":[
         {"star":
        [{ "imgUrl": "./img/01.png", "vedioUrl": "....", "name": "01", "topic": "Star", "mode": "text2audio" },{ "imgUrl": "./img/02.png","vedioUrl": "....","name": "02", "topic": "Star", "mode": "text2audio" }]
        },
        {"house":
        [{ "imgUrl": "./img/03.png", "vedioUrl": "....","name": "01", "topic": "house", "mode": "text2audio" },{ "imgUrl": "./img/04.png", "vedioUrl": "....","name": "01", "topic": "house", "mode": "text2audio" }]
        }
  		   ]
}
```

